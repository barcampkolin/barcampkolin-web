<?php

namespace App\Presenters;

use App\Model\ArchiveManager;
use Nette\Application\Responses\TextResponse;

class ArchivedPresenter extends BasePresenter
{
    /**
     * @var ArchiveManager
     */
    private $archiveManager;


    /**
     * @param ArchiveManager $archiveManager
     */
    public function __construct(ArchiveManager $archiveManager)
    {
        parent::__construct();
        $this->archiveManager = $archiveManager;
    }


    /**
     * @param $year
     * @param $page
     * @throws \Nette\Application\AbortException
     */
    public function actionDefault($year, $page)
    {
        $url = "/$year/$page";

        $file = $this->archiveManager->loadArchivedPage($url);

        $this->sendResponse(new TextResponse($file));
    }
}
