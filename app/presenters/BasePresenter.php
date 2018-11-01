<?php

namespace App\Presenters;

use App\Model\ArchiveManager;
use App\Model\EventInfoProvider;
use Nette;
use Nextras\Application\UI\SecuredLinksPresenterTrait;

/**
 * Base presenter for all application presenters.
 */
abstract class BasePresenter extends Nette\Application\UI\Presenter
{
    use SecuredLinksPresenterTrait;

    /**
     * @var EventInfoProvider $eventInfo
     */
    protected $eventInfo;
    /**
     * @var bool $isArchivationProcess True when archivation process is currently running & in progress
     */
    private $isArchivationProcess;


    /**
     * @param EventInfoProvider $eventInfo
     */
    public function inject(EventInfoProvider $eventInfo, ArchiveManager $archiveManager)
    {
        $this->eventInfo = $eventInfo;
        $this->isArchivationProcess = $archiveManager->isArchivationProcess();
    }


    /**
     *
     * @throws Nette\Utils\JsonException
     */
    protected function beforeRender()
    {
        parent::beforeRender();
        $parameters = $this->context->getParameters();
        $this->template->wwwDir = $parameters['wwwDir'];

        $dates = $this->eventInfo->getDates();

        $this->template->dates = $dates;
        $this->template->features = $this->eventInfo->getFeatures();
        $this->template->socialUrls = $this->eventInfo->getSocialUrls();
        $this->template->year = $dates['year'];

        $this->template->isArchivationProcess = $this->isArchivationProcess;
    }
}
