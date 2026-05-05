<?php

namespace App\Model;

use App\Orm\Talk\Talk;
use DateInterval;
use DateTime;
use DateTimeImmutable;
use Nette\Http\Request;
use Nette\Utils\DateTime as NetteDateTime;
use Nette\Utils\FileSystem;
use Nette\Utils\JsonException;

readonly class ArchiveManager
{
    const IN_ARCHIVATION_COOKIE_KEY = '_in_archivation';

    public function __construct(
        private array $archivedStaticFolders,
        private array $pages,
        private ConfigManager $config,
        private Request $httpRequest,
        private TalkManager $talkManager,
        private ArchiveStorage $archiveStorage,
        private PartnersManager $partnersManager,
        private ConfereeManager $confereeManager,
        private ScheduleManager $scheduleManager
    ) {
    }


    public function getCurrentYear(): int
    {
        $currentYear = new DateTimeImmutable()->format('Y');

        try {
            return (int)$this->config->get('dates.currentYear', $currentYear);
        } catch (JsonException) {
            return (int)$currentYear;
        }
    }


    private function setCurrentYear(int $year): void
    {
        $this->config->set('dates.currentYear', $year);
    }


    /**
     * @return int[]
     */
    public function getArchivedYears(): array
    {
        try {
            return (array)$this->config->get('archive.years', []);
        } catch (JsonException) {
            return [];
        }
    }


    public function addArchivedYear(int $year): void
    {
        $years = $this->getArchivedYears();
        $years[] = $year;
        $this->config->set('archive.years', $years);
    }


    /**
     * @return bool True when archivation process is currently running & in progress
     */
    public function isArchivationProcess(): bool
    {
        return (bool)$this->httpRequest->getCookie(self::IN_ARCHIVATION_COOKIE_KEY);
    }


    public function archive(int $currentYear, int $toYear, DateTime $newEventDate): void
    {
        $realCurrentYear = $this->getCurrentYear();
        if ($currentYear !== $realCurrentYear) {
            throw new DuplicateNameException(
                "Unable to archive year $currentYear because it is not real current year ($realCurrentYear)"
            );
        }

        $this->archiveStaticFiles($currentYear, $toYear);
        $this->updateDates($newEventDate);
        $this->setCurrentYear($toYear);
        $this->resetSchedule();

        $this->purgeAllOldData();

        $this->addArchivedYear($currentYear);
    }


    /**
     * @return string[]
     */
    public function getArchiveUrls(?int $year = null): array
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


    public function saveArchivedPage(string $url, string $content): void
    {
        $this->archiveStorage->savePage($url, $content);
    }


    public function loadArchivedPage(string $url): string
    {
        return $this->archiveStorage->loadPage($url);
    }


    private function archiveStaticFiles(int $fromYear, int $toYear): void
    {
        foreach ($this->archivedStaticFolders as $folderPrefix) {
            $old = $folderPrefix . '/' . $fromYear;
            $new = $folderPrefix . '/' . $toYear;
            $this->copyStaticFiles($old, $new);
        }
    }


    private function copyStaticFiles(string $fromDir, string $toDir): void
    {
        FileSystem::copy($fromDir, $toDir);
    }


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

        $dateDiff = $this->getDateDiff($this->getCurrentEventDate(), $newEventDate);

        foreach ($dateKeys as $key) {
            $this->updateDate($key, $dateDiff);
        }
    }


    private function getDateDiff(DateTime $oldDate, DateTime $newDate): DateInterval
    {
        return $oldDate->diff($newDate, absolute: false);
    }


    protected function updateDate(string $key, DateInterval $dateDiff): void
    {
        $oldDate = NetteDateTime::from($this->config->get($key));

        $newDate = $oldDate->add($dateDiff);

        $this->config->set($key, $newDate);
    }


    public function getCurrentEventDate(): NetteDateTime
    {
        return NetteDateTime::from($this->config->get(EventInfoProvider::DATE_EVENT));
    }


    private function formatDate(DateTime $date): string
    {
        return $date->format('Y-m-d\TH:i:s');
    }


    private function purgeAllOldData(): void
    {
        $this->partnersManager->purgeAll(true);
        $this->talkManager->purgeAll(true);
        $this->talkManager->purgeAllProgram(true);
        $this->confereeManager->purgeAll(true);
    }


    private function resetSchedule(): void
    {
        $this->scheduleManager->changeCurrentStep(null);
    }
}

