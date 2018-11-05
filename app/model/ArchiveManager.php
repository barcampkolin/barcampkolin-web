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
    /**
     * @var Request
     */
    private $httpRequest;
    /**
     * @var array
     */
    private $archivedStaticFolders;
    /**
     * @var ConfigManager
     */
    private $config;
    /**
     * @var array
     */
    private $pages;
    /**
     * @var TalkManager
     */
    private $talkManager;
    /**
     * @var ArchiveStorage
     */
    private $archiveStorage;

    const IN_ARCHIVATION_COOKIE_KEY = '_in_archivation';
    /**
     * @var PartnersManager
     */
    private $partnersManager;
    /**
     * @var ConfereeManager
     */
    private $confereeManager;
    /**
     * @var ScheduleManager
     */
    private $scheduleManager;


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
    public function __construct(
        array $archivedStaticFolders,
        array $pages,
        ConfigManager $config,
        Request $httpRequest,
        TalkManager $talkManager,
        ArchiveStorage $archiveStorage,
        PartnersManager $partnersManager,
        ConfereeManager $confereeManager,
        ScheduleManager $scheduleManager
    ) {
        $this->config = $config;

        $this->httpRequest = $httpRequest;
        $this->archivedStaticFolders = $archivedStaticFolders;
        $this->pages = $pages;
        $this->talkManager = $talkManager;
        $this->archiveStorage = $archiveStorage;
        $this->partnersManager = $partnersManager;
        $this->confereeManager = $confereeManager;
        $this->scheduleManager = $scheduleManager;
    }


    /**
     * @return int
     */
    public function getCurrentYear()
    {
        $currentYear = (new DateTime)->format('Y');

        try {
            return (int)$this->config->get('dates.currentYear', $currentYear);
        } catch (JsonException $e) {
            return (int)$currentYear;
        }
    }


    /**
     * @param $year
     * @throws JsonException
     */
    private function setCurrentYear($year)
    {
        $this->config->set('dates.currentYear', $year);
    }


    /**
     * @return array
     */
    public function getArchivedYears()
    {
        try {
            return (array)$this->config->get('archive.years', []);
        } catch (JsonException $e) {
            return [];
        }
    }


    /**
     * @param $year
     * @throws JsonException
     */
    public function addArchivedYear($year)
    {
        $years = $this->getArchivedYears();
        $years[] = $year;
        $this->config->set('archive.years', $years);
    }


    /**
     * @return bool True when archivation process is currently running & in progress
     */
    public function isArchivationProcess()
    {
        return (bool)$this->httpRequest->getCookie(self::IN_ARCHIVATION_COOKIE_KEY, false);
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
    public function archive($currentYear, $toYear, DateTime $newEventDate)
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
    public function getArchiveUrls($year = null)
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
    public function saveArchivedPage($url, $content)
    {
        $this->archiveStorage->savePage($url, $content);
    }


    public function loadArchivedPage($url)
    {
        return $this->archiveStorage->loadPage($url);
    }

    /**
     * @param int $fromYear
     * @param int $toYear
     * @throws \Nette\IOException
     */
    private function archiveStaticFiles($fromYear, $toYear)
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
    private function copyStaticFiles($fromDir, $toDir)
    {
        FileSystem::copy($fromDir, $toDir);
    }


    /**
     * @param DateTime $newEventDate
     * @throws JsonException
     */
    private function updateDates(DateTime $newEventDate)
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
    private function getDateDiff(DateTime $oldDate, DateTime $newDate)
    {
        return $newDate->diff($oldDate, true);
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
    private function formatDate(DateTime $date)
    {
        return $date->format('Y-m-d\TH:i:s');
    }


    /**
     * @throws \InvalidArgumentException
     */
    private function purgeAllOldData()
    {
        $this->partnersManager->purgeAll(true);
        $this->talkManager->purgeAll(true);
        $this->talkManager->purgeAllProgram(true);
        $this->confereeManager->purgeAll(true);
    }


    /**
     * @throws JsonException
     */
    private function resetSchedule()
    {
        $this->scheduleManager->changeCurrentStep(null);
    }
}

