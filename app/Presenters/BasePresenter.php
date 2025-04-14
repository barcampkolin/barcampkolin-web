<?php

namespace App\Presenters;

use App\Model\ArchiveManager;
use App\Model\EventInfoProvider;
use App\Model\GravatarImageProvider;
use Nette;
use Nextras\Application\UI\SecuredLinksPresenterTrait;

/**
 * Base presenter for all application presenters.
 */
abstract class BasePresenter extends Nette\Application\UI\Presenter
{
    use SecuredLinksPresenterTrait;

    protected EventInfoProvider $eventInfo;
    /** True when archivation process is currently running & in progress*/
    private ?bool $isArchivationProcess = null;
    private Nette\DI\Container $container;
    private GravatarImageProvider $gravatarImageProvider;


    public function inject(
        EventInfoProvider $eventInfo,
        ArchiveManager $archiveManager,
        Nette\DI\Container $container,
        GravatarImageProvider $gravatarImageProvider
    ): void {
        $this->eventInfo = $eventInfo;
        $this->isArchivationProcess = $archiveManager->isArchivationProcess();
        $this->container = $container;
        $this->gravatarImageProvider = $gravatarImageProvider;
    }


    /**
     *
     * @throws Nette\Utils\JsonException
     */
    protected function beforeRender()
    {
        parent::beforeRender();
        $parameters = $this->container->getParameters();

        $dates = $this->eventInfo->getDates();

        $dataLayer = new Nette\Utils\ArrayHash();
        if ($this->isArchivationProcess) {
            $dataLayer['isArchive'] = true;
            $dataLayer['archiveYear'] = $dates['year'];
        }

        $this->template->wwwDir = $parameters['wwwDir'];

        $this->template->dates = $dates;
        $this->template->features = $this->eventInfo->getFeatures();
        $this->template->socialUrls = $this->eventInfo->getUrls();
        $this->template->year = $dates['year'];

        $this->template->dataLayer = $dataLayer;

        $this->template->isArchivationProcess = $this->isArchivationProcess;

        $this->template->addFunction('isPassed', $this->isDatePassed(...));
        $this->template->addFunction('gravatarize', $this->gravatarImageProvider->gravatarize(...));
    }

    /**
     * @deprecated Stav webu by měl být řízen spíš stavem, než porovnánávním s aktuálním datem
     */
    private function isDatePassed(\DateTimeInterface $date): bool
    {
        return $date < new \DateTimeImmutable();
    }
}
