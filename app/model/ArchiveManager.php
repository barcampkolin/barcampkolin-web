<?php

namespace App\Model;

use App\Orm\Talk;
use DateInterval;
use DateTime;
use Nette\Http\Request;
use Nette\Utils\DateTime as NetteDateTime;
use Nette\Utils\FileSystem;
use Nette\Utils\JsonException;

class ArchiveManager
{
    const IN_ARCHIVATION_COOKIE_KEY = '_in_archivation';


    /**
     * @param array $archivedStaticFolders
     * @param array $pages
     * @param ConfigManager $config
     * @param Request $httpRequest
     * @param TalkManager $talkManager
     * @param ArchiveStorage $archiveStorage
     * @param PartnersManager $partnersManager
     * @param ConfereeManager $confereeManager
     * @param ScheduleManager $scheduleManager
     */
    public function __construct(private readonly array $archivedStaticFolders, private array $pages, private readonly ConfigManager $config, private readonly Request $httpRequest, private readonly TalkManager $talkManager, private readonly ArchiveStorage $archiveStorage, private readonly PartnersManager $partnersManager, private readonly ConfereeManager $confereeManager, private readonly ScheduleManager $scheduleManager)
    {
    }


    /**
     * @return int
     */
    public function getCurrentYear(): int
    {
        $currentYear = (new DateTime)->format('Y');

        try {
            return (int)$this->config->get('dates.currentYear', $currentYear);
        } catch (JsonException) {
            return (int)$currentYear;
        }
    }


    /**
     * @param $year
     * @throws JsonException
     */
    private function setCurrentYear($year): void
    {
        $this->config->set('dates.currentYear', (int)$year);
    }


    /**
     * @return array
     */
    public function getArchivedYears(): array
    {
        try {
            return (array)$this->config->get('archive.years', []);
        } catch (JsonException) {
            return [];
        }
    }


    /**
     * @param $year
     * @throws JsonException
     */
    public function addArchivedYear($year): void
    {
        $years = $this->getArchivedYears();
        $years[] = (int)$year;
        $this->config->set('archive.years', $years);
    }


    /**
     * @return bool True when archivation process is currently running & in progress
     */
    public function isArchivationProcess(): bool
    {
        return (bool)$this->httpRequest->getCookie(self::IN_ARCHIVATION_COOKIE_KEY);
    }


    /**
     * @param $currentYear
     * @param $toYear
     * @param DateTime $newEventDate
     * @throws DuplicateNameException
     * @throws JsonException
     * @throws \Nette\IOException
     * @throws \InvalidArgumentException
     */
    public function archive($currentYear, $toYear, DateTime $newEventDate): void
    {
        $realCurrentYear = (int)$this->getCurrentYear();
        if (((int)$currentYear) !== $realCurrentYear) {
            throw new DuplicateNameException("Unable to archive year $currentYear because it is not real current year ($realCurrentYear)");
        }

        $this->archiveStaticFiles($currentYear, $toYear);
        $this->updateDates($newEventDate);
        $this->setCurrentYear($toYear);
        $this->resetSchedule();

        $this->purgeAllOldData();

        $this->addArchivedYear($currentYear);
    }


    /**
     * @param $year
     * @return string[]
     */
    public function getArchiveUrls($year = null): array
    {
        $yearPrefix = $year !== null ? '/' . $year : '';

        $urls = [];
        foreach ($this->pages['simple'] as $page) {
            $urls[] = $yearPrefix . $page;
        }

        $talkUrlMask = $this->pages['talks'];

        /** @var Talk $talk */
        foreach ($this->talkManager->findAll() as $talk) {
            $urls[] = $yearPrefix . sprintf($talkUrlMask, $talk->id);
        }

        return $urls;
    }


    /**
     * @param $url
     * @param $content
     * @throws \Nette\IOException
     */
    public function saveArchivedPage($url, string $content): void
    {
        $this->archiveStorage->savePage($url, $content);
    }


    /**
     * @param string $url
     * @return string
     * @throws \Nette\FileNotFoundException
     */
    public function loadArchivedPage($url): string
    {
        return $this->archiveStorage->loadPage($url);
    }


    /**
     * @param int $fromYear
     * @param int $toYear
     * @throws \Nette\IOException
     */
    private function archiveStaticFiles($fromYear, $toYear): void
    {
        foreach ($this->archivedStaticFolders as $folderPrefix) {
            $old = $folderPrefix . '/' . $fromYear;
            $new = $folderPrefix . '/' . $toYear;
            $this->copyStaticFiles($old, $new);
        }
    }


    /**
     * @param $fromDir
     * @param $toDir
     * @throws \Nette\IOException
     */
    private function copyStaticFiles(string $fromDir, string $toDir): void
    {
        FileSystem::copy($fromDir, $toDir);
    }


    /**
     * @param DateTime $newEventDate
     * @throws JsonException
     */
    private function updateDates(DateTime $newEventDate): void
    {
        $dateKeys = [
            EventInfoProvider::DATE_EVENT,
            EventInfoProvider::DATE_TALKS,
            EventInfoProvider::DATE_VOTE,
            EventInfoProvider::DATE_PROGRAM,
            EventInfoProvider::DATE_REPORT,
            EventInfoProvider::SCHEDULE_VISUAL_DATE_BEGIN,
            EventInfoProvider::SCHEDULE_VISUAL_DATE_END,
        ];

        /** @var DateInterval $dateDiff */
        $dateDiff = $this->getDateDiff($this->getCurrentEventDate(), $newEventDate);

        foreach ($dateKeys as $key) {
            $this->updateDate($key, $dateDiff);
        }
    }


    /**
     * @param DateTime $oldDate
     * @param DateTime $newDate
     * @return DateInterval
     */
    private function getDateDiff(DateTime $oldDate, DateTime $newDate): \DateInterval
    {
        return $oldDate->diff($newDate, false);
    }


    /**
     * @param $key
     * @param DateInterval $dateDiff
     * @throws JsonException
     */
    protected function updateDate($key, DateInterval $dateDiff)
    {
        $oldDate = NetteDateTime::from($this->config->get($key));

        $newDate = $oldDate->add($dateDiff);

        $this->config->set($key, $newDate);
    }


    /**
     * @return NetteDateTime
     * @throws JsonException
     */
    public function getCurrentEventDate()
    {
        return NetteDateTime::from($this->config->get(EventInfoProvider::DATE_EVENT));
    }


    /**
     * @param DateTime $date
     * @return string
     */
    private function formatDate(DateTime $date): string
    {
        return $date->format('Y-m-d\TH:i:s');
    }


    /**
     * @throws \InvalidArgumentException
     */
    private function purgeAllOldData(): void
    {
        $this->partnersManager->purgeAll(true);
        $this->talkManager->purgeAll(true);
        $this->talkManager->purgeAllProgram(true);
        $this->confereeManager->purgeAll(true);
    }


    /**
     * @throws JsonException
     */
    private function resetSchedule(): void
    {
        $this->scheduleManager->changeCurrentStep(null);
    }
}

