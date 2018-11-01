<?php

namespace App\Model;

use DateTime;
use Nette\Http\Request;
use Nette\Utils\JsonException;

class ArchiveManager
{
    /**
     * @var int
     */
    private $year;
    /**
     * @var Request
     */
    private $httpRequest;


    public function __construct(ConfigManager $config, Request $httpRequest)
    {
        $this->year = $this->loadCurrentYear($config);
        $this->httpRequest = $httpRequest;
    }


    /**
     * @return int
     */
    public function getCurrentYear()
    {
        return $this->year;
    }


    /**
     * @return bool True when archivation process is currently running & in progress
     */
    public function isArchivationProcess()
    {
        return (bool)$this->httpRequest->getCookie('_in_archivation', false);
    }


    /**
     * @param ConfigManager $config
     * @return int
     */
    private function loadCurrentYear(ConfigManager $config)
    {
        $currentYear = (new DateTime)->format('Y');
        try {
            return (int)$config->get('dates.currentYear', $currentYear);
        } catch (JsonException $e) {
            return (int)$currentYear;
        }
    }
}

