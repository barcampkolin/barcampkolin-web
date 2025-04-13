<?php

namespace App\AdminModule\Presenters;

use App\Model\ArchiveManager;
use DateInterval;
use Nette\Application\ForbiddenRequestException;
use Nette\Application\UI\Form;
use Nette\InvalidStateException;
use Nette\Utils\ArrayHash;
use Nette\Utils\DateTime;
use Nette\Utils\Random;
use Nette\Utils\Strings;

class ArchivePresenter extends BasePresenter
{
    public function __construct(
        private readonly ArchiveManager $archiveManager
    ) {
        parent::__construct();
    }


    /**
     * @throws InvalidStateException
     * @throws \Nette\InvalidArgumentException
     */
    public function renderDefault(): void
    {
        $this->template->year = $this->archiveManager->getCurrentYear();
        $this->template->pages = $this->archiveManager->getArchiveUrls($this->archiveManager->getCurrentYear());
        $this->template->csrfToken = $this->getArchiveCsrfToken();
        $this->template->cookieKey = ArchiveManager::IN_ARCHIVATION_COOKIE_KEY;
    }


    /**
     * @return Form
     * @throws \Nette\Utils\JsonException
     */
    public function createComponentArchiveForm(): \Nette\Application\UI\Form
    {
        $form = new Form();

        $form->addGroup();

        $form->addHidden('fromYear', $this->archiveManager->getCurrentYear());
        $form->addHidden('expectedPages', count($this->archiveManager->getArchiveUrls('any')));
        $form->addHidden('archivedPages', 0)->setHtmlId('archivedPagesValue');

        $form->addInteger('toYear', 'Rok nového ročníku')
            ->setRequired(true)
            ->setDefaultValue($this->archiveManager->getCurrentYear() + 1);

        $form->addText('eventDate', 'Datum konání události')
            ->setType('datetime-local')
            ->setDefaultValue(
                $this->dateToHtml5($this->archiveManager->getCurrentEventDate()->add(new DateInterval('P1Y')))
            );

        $form->addSubmit('submit', 'Archivovat')
            ->setOption('primary', true)
            ->getControlPrototype()->addAttributes(['class' => 'start-archivation']);

        $form->addProtection();

        $form->onSuccess[] = $this->onArchiveFormSuccess(...);

        return $form;
    }


    /**
     * @param Form $form
     * @param ArrayHash $values
     * @throws InvalidStateException
     * @throws \App\Model\DuplicateNameException
     * @throws \Nette\Application\AbortException
     * @throws \Nette\IOException
     * @throws \Nette\Utils\JsonException
     * @throws \InvalidArgumentException
     */
    public function onArchiveFormSuccess(Form $form, ArrayHash $values): void
    {
        $fromYear = $values['fromYear'];
        $toYear = $values['toYear'];
        $eventDate = DateTime::from($values['eventDate']);

        if ($values['expectedPages'] !== $values['archivedPages']) {
            throw new InvalidStateException(
                "Archived pages ($values[archivedPages]) is not same as expected ($values[expectedPages])"
            );
        }

        //DANGER
        $this->archiveManager->archive($fromYear, $toYear, $eventDate);

        $this->flashMessage('Nový ročník připraven', 'success');
        $this->redirect('this');
    }


    /**
     * @throws ForbiddenRequestException
     * @throws \Nette\Application\AbortException
     * @throws \Nette\IOException
     * @throws \Nette\InvalidArgumentException
     * @throws \Nette\InvalidStateException
     */
    public function actionUploadArchive(): void
    {
        $httpRequest = $this->getHttpRequest();
        $url = $httpRequest->getPost('url');
        $csrfToken = $httpRequest->getPost('csrfToken');
        $content = $httpRequest->getPost('content');

        $this->validateArchiveCsrfToken($csrfToken);

        $this->archiveManager->saveArchivedPage($url, $content);

        $this->sendJson(['status' => 'OK']);
    }


    /**
     * @param $date
     * @return string
     */
    private function dateToHtml5($date): string
    {
        return (new DateTime($date))->format('Y-m-d\TH:i:s');
    }


    /**
     * @return string
     * @throws \Nette\InvalidArgumentException
     * @throws \Nette\InvalidStateException
     */
    private function getArchiveCsrfToken()
    {
        $session = $this->getSession(self::class);
        if (!isset($session['csrfToken'])) {
            $session['csrfToken'] = Random::generate();
        }

        return $session['csrfToken'];
    }


    /**
     * @param $token
     * @throws ForbiddenRequestException
     * @throws \Nette\InvalidArgumentException
     * @throws \Nette\InvalidStateException
     */
    private function validateArchiveCsrfToken($token): void
    {
        if (Strings::compare($token, $this->getArchiveCsrfToken()) !== true) {
            throw new ForbiddenRequestException('Invalid archive CSRF token');
        }
    }

}
