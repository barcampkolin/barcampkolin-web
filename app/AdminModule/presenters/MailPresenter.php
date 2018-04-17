<?php

namespace App\AdminModule\Presenters;

use App\Model\EntityNotFound;
use App\Model\MailDynamicLoader;
use App\Model\MailerManager;
use Nette\Application\BadRequestException;
use Nette\Application\UI\Form;
use Nette\Utils\ArrayHash;
use Ublaboo\DataGrid\DataGrid;

class MailPresenter extends BasePresenter
{
    /**
     * @var MailDynamicLoader
     */
    private $mailLoader;
    /**
     * @var MailerManager
     */
    private $mailer;


    /**
     * MailPresenter constructor.
     * @param MailDynamicLoader $mailLoader
     * @param MailerManager $mailer
     */
    public function __construct(MailDynamicLoader $mailLoader, MailerManager $mailer)
    {
        $this->mailLoader = $mailLoader;
        $this->mailer = $mailer;
    }


    /**
     * @param string $name
     * @throws \Ublaboo\DataGrid\Exception\DataGridException
     */
    public function createComponentMailsDatagrid($name)
    {
        $grid = new DataGrid($this, $name);

        $mails = [];

        foreach ($this->mailLoader->getMails() as $key => $title) {
            $mails[] = [
                'id' => $key,
                'title' => $title,
            ];
        }

        $grid->setDataSource($mails);
        $grid->addColumnLink('title', 'Typ e-mailu', 'edit', null, ['id']);
        $grid->addAction('edit', 'Upravit')->setTitle('Upravit e-mail');
        $grid->addAction('view', 'Zobrazit')->setTitle('Zobrazit náhled e-mailu');
        $grid->setPagination(false);
    }


    /**
     * @param string $id
     * @throws BadRequestException
     * @throws \Nette\Utils\JsonException
     */
    public function renderEdit($id)
    {
        $mail = $this->getMailById($id);

        $this->template->id = $id;


        /** @var Form $form */
        $form = $this['editForm'];
        $form->setDefaults($mail);
    }


    /**
     * @param $id
     * @throws BadRequestException
     * @throws \Nette\Application\AbortException
     * @throws \Nette\Utils\JsonException
     */
    public function renderView($id)
    {
        $this->forward('preview', ['id' => $id]); //temporary
        $mail = $this->getMailById($id);
    }


    /**
     * @param $id
     * @throws BadRequestException
     * @throws \Nette\Application\AbortException
     * @throws \Nette\Utils\JsonException
     */
    public function renderPreview($id)
    {
        $mail = $this->getMailById($id);

        echo $mail['body'];
        $this->terminate();
    }


    /**
     * @param $recipient
     * @throws EntityNotFound
     * @throws \Nette\Application\AbortException
     * @throws \Nette\Utils\JsonException
     */
    public function renderSendVoteAnnounce($recipient)
    {
        $this->mailer->getVoteAnnounceMessage($recipient)->send();

        $this->sendJson(["status"=>"OK"]);
    }


    /**
     * @param $id
     * @return array
     * @throws BadRequestException
     * @throws \Nette\Utils\JsonException
     */
    private function getMailById($id)
    {
        try {
            return $this->mailLoader->getMailById($id);
        } catch (EntityNotFound $e) {
            throw new BadRequestException('Tento e-mail nebyl nalezen', 404, $e);
        }
    }


    /**
     * @param string $name
     * @return Form
     */
    public function createComponentEditForm($name)
    {
        $form = new Form();

        $form->addHidden('id');
        $form->addText('subject', 'Předmět');
        $form->addTextArea('body', 'Tělo e-mailu', null, 20)
            ->setOption('description', 'Editace HTML');
        $form->addSubmit('submit', 'Uložit');

        $form->addProtection();

        $form->onSuccess[] = [$this, 'save'];

        return $form;
    }


    /**
     * @param Form $form
     * @param ArrayHash $values
     * @throws EntityNotFound
     * @throws \Nette\Application\AbortException
     */
    public function save(Form $form, $values)
    {
        $id = $values->id;

        $this->mailLoader->setMail($id, $values['subject'], $values['body']);

        $this->flashMessage('Uloženo', 'success');
        $this->redirect('this');
    }
}
