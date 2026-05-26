<?php


namespace App\AdminModule\Presenters;

use App\Model\EventInfoProvider;
use Nette\Application\ForbiddenRequestException;
use Nette\Application\UI\Presenter;
use Nextras\Application\UI\SecuredLinksPresenterTrait;

class BasePresenter extends Presenter
{
    use SecuredLinksPresenterTrait;

    private ?\App\Model\EventInfoProvider $eventInfo = null;


    public function inject(EventInfoProvider $eventInfo): void
    {
        $this->eventInfo = $eventInfo;
    }


    #[\Override]
    protected function startup(): void
    {
        parent::startup();

        if (!$this->getUser()->isLoggedIn()) {
            $this->flashMessage('Pro přístup do administrace se nejdříve přihlaste.');
            $this->redirect(':Sign:in', ['backlink' => $this->storeRequest()]);
        }

        if (!$this->getUser()->isInRole('admin')) {
            $this->flashMessage('Váš učet nemá do administrace přístup.');
            throw new ForbiddenRequestException('Nemáte přístup do administrace');
        }
    }


    protected function beforeRender(): void
    {
        parent::beforeRender();
        $dates = $this->eventInfo->getDates();
        $this->template->year = $dates->year;
    }
}
