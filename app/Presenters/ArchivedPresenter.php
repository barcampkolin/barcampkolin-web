<?php

namespace App\Presenters;

use App\Model\ArchiveManager;
use Nette\Application\BadRequestException;
use Nette\Application\Responses\TextResponse;
use Nette\FileNotFoundException;
use Nette\Http\IResponse;

class ArchivedPresenter extends BasePresenter
{
    public function __construct(
        private readonly ArchiveManager $archiveManager
    ) {
        parent::__construct();
    }


    public function actionRender(string $year, ?string $page): void
    {
        try {
            $url = "/$year/$page";
            $file = $this->archiveManager->loadArchivedPage($url);

            // Hack - remove dynamic CSP on archive because it's static file
            $this->getHttpResponse()->setHeader('Content-Security-Policy', null);


            $this->sendResponse(new TextResponse($file));
        } catch (FileNotFoundException $e) {
            throw new BadRequestException("$url not found", IResponse::S404_NotFound, $e);
        }
    }


    public function renderList(): void
    {
        $this->template->archivedYears = $this->archiveManager->getArchivedYears();
    }
}
