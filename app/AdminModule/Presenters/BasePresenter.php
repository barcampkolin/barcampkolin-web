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


    /**
     * @param EventInfoProvider $eventInfo
     */
    public function inject(EventInfoProvider $eventInfo): void
    {
        $this->eventInfo = $eventInfo;
    }


    /**
     * @throws ForbiddenRequestException
     * @throws \Nette\Application\AbortException
     */
    protected function startup()
    {
        parent::startup();

        if (!$this->user->isLoggedIn()) {
            $this->flashMessage('Pro přístup do administrace se nejdříve přihlaste.');
            $this->redirect(':Sign:in', ['backlink' => $this->storeRequest()]);
        }

        if (!$this->user->isInRole('admin')) {
            $this->flashMessage('Váš učet nemá do administrace přístup.');
            throw new ForbiddenRequestException('Nemáte přístup do administrace');
        }
    }


    /**
     * @throws \Nette\Utils\JsonException
     */
    protected function beforeRender()
    {
        parent::beforeRender();
        $dates = $this->eventInfo->getDates();
        $this->template->year = $dates['year'];
    }
}
