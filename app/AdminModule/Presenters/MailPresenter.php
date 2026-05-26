<?php

namespace App\AdminModule\Presenters;

use App\Model\EntityNotFound;
use App\Model\MailDynamicLoader;
use App\Model\MailerManager;
use Nette\Application\BadRequestException;
use Nette\Application\UI\Form;
use Nette\Forms\Controls\SubmitButton;
use Nette\Utils\ArrayHash;
use Nette\Utils\Json;
use Ublaboo\DataGrid\DataGrid;

class MailPresenter extends BasePresenter
{
    public function __construct(
        private readonly MailDynamicLoader $mailLoader,
        private readonly MailerManager $mailer
    ) {
        parent::__construct();
    }


    public function createComponentMailsDatagrid(string $name): void
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
        $grid->addAction('bulkSender', 'Rozeslat')->setTitle('Rozeslat e-mail');
        $grid->addAction('edit', 'Upravit')->setTitle('Upravit e-mail');
        $grid->addAction('view', 'Zobrazit')->setTitle('Zobrazit náhled e-mailu');
        $grid->setPagination(false);
    }


    public function createComponentLayoutsDatagrid(string $name): void
    {
        $grid = new DataGrid($this, $name);

        $mails = [];

        foreach ($this->mailLoader->getLayouts() as $key => $title) {
            $mails[] = [
                'id' => $key,
                'title' => $title,
            ];
        }

        $grid->setDataSource($mails);
        $grid->addColumnLink('title', 'Layout', 'edit', null, ['id']);
        $grid->addAction('edit', 'Upravit')->setTitle('Upravit e-mail');
        $grid->setPagination(false);
    }


    public function renderEdit(string $id): void
    {
        $this->template->id = $id;

        /** @var Form $form */
        $form = $this['editForm'];

        if ($id === 'layout') {
            $mail = $this->mailLoader->getLayout();
            $form->removeComponent($form['subject']);
            $form->removeComponent($form['header']);
            $form->removeComponent($form['preheader']);
            $form->removeComponent($form['purpose']);
            $form->removeComponent($form['submitAndShow']);
        } else {
            $mail = $this->getMailById($id);
        }

        $form->setDefaults($mail);
    }


    public function renderView(string $id): never
    {
        $this->forward('preview', ['id' => $id]); //temporary
    }


    public function renderPreview(string $id, string $parametersJson = '{}'): never
    {
        $parameters = Json::decode($parametersJson, forceArrays: true);

        $message = $this->mailer->getDynamicMessage(null, $id, $parameters);

        $body = $this->mailer->compileBody($message);

        echo $body;

        $this->terminate();
    }


    public function renderBulkSender(string $id): void
    {
        try {
            $mail = $this->mailLoader->getMailById($id);
        } catch (EntityNotFound $e) {
            throw new BadRequestException($e->getMessage(), $e->getCode(), $e);
        }

        $this->template->title = $mail['title'];
        $this->template->mailParamsCount = count($mail['params']);

        $this->template->endpoint = $this->link('//send', [
            'templateId' => $id,
            'recipient' => '{{recipient}}'
        ]);
    }


    public function actionSend(string $templateId, ?string $recipient, string $parametersJson = '{}'): never
    {
        $parameters = Json::decode($parametersJson, forceArrays: true);

        $this->mailer->getDynamicMessage($recipient, $templateId, $parameters)->send();

        $reponse = [
            'status' => 'ok',
            'templateId' => $templateId,
            'recipient' => $recipient,
            'parameters' => $parameters,
        ];

        $this->sendJson($reponse);
    }


    private function getMailById(string $id): array
    {
        try {
            return $this->mailLoader->getMailById($id);
        } catch (EntityNotFound $e) {
            throw new BadRequestException('Tento e-mail nebyl nalezen', 404, $e);
        }
    }


    public function createComponentEditForm(): Form
    {
        $form = new Form();

        $form->addHidden('id');
        $form->addSubmit('submit', 'Uložit')->setOption('primary', true);
        $form->addSubmit('submitAndShow', 'Zobrazit');

        $form->addText('subject', 'Předmět e-mailu');

        $form->addTextArea('body', 'Tělo e-mailu', null, 20)
            ->setOption('description', 'Editace HTML');

        $form->addText('header', 'Nadpis')
            ->setOption('description', 'Zobrazí se v e-mailu jako velký nadpis (a propíše se technicky na víc míst)');

        $form->addText('preheader', 'Náhledový text')
            ->setOption('description', 'Pár slov, které někteří klienti mohou zobrazit v náhledu e-mailu');

        $form->addText('purpose', 'Odůvodnění poslání e-mailu')
            ->setOption('description', 'Zobrazuje se v patičce e-mailu (doporučeno v rámci GDPR)');

        $form->addSubmit('submit2', 'Uložit')->setOption('primary', true);

        $form->addProtection();

        $form->onSuccess[] = $this->save(...);

        return $form;
    }


    public function save(Form $form, ArrayHash $values): never
    {
        $id = $values->id;
        if ($id === 'layout') {
            $this->mailLoader->setLayout($values['body']);
        } else {
            $this->mailLoader->setMail(
                $id,
                $values['subject'],
                $values['body'],
                $values['header'],
                $values['preheader'],
                $values['purpose']
            );
        }

        $this->flashMessage('Uloženo', 'success');


        /** @var SubmitButton $submitAndShow */
        $submitAndShow = $form['submitAndShow'];
        if ($submitAndShow->isSubmittedBy()) {
            $this->redirect('preview', ['id' => $id]);
        }
        $this->redirect('this');
    }
}
