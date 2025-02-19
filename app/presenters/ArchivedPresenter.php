<?php

namespace App\Presenters;

use App\Model\ArchiveManager;
use Nette\Application\BadRequestException;
use Nette\Application\Responses\TextResponse;
use Nette\FileNotFoundException;
use Nette\Http\IResponse;

class ArchivedPresenter extends BasePresenter
{
    /**
     * @param ArchiveManager $archiveManager
     */
    public function __construct(private readonly ArchiveManager $archiveManager)
    {
        parent::__construct();
    }


    /**
     * @param $year
     * @param $page
     * @throws BadRequestException
     * @throws \Nette\Application\AbortException
     */
    public function actionRender($year, $page): void
    {
        try {
            $url = "/$year/$page";
            $file = $this->archiveManager->loadArchivedPage($url);

            // Hack - remove dynamic CSP on archive because it's static file
            $this->getHttpResponse()->setHeader('Content-Security-Policy', null);


            $this->sendResponse(new TextResponse($file));
        } catch (FileNotFoundException $e) {
            throw new BadRequestException("$url not found", IResponse::S404_NOT_FOUND, $e);
        }
    }


    public function renderList(): void
    {
        $this->template->archivedYears = $this->archiveManager->getArchivedYears();
    }
}
