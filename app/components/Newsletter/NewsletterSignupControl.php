<?php

namespace App\Components\Newsletter;

use App\Model\DuplicateNameException;
use App\Model\NewsletterSignupManager;
use Nette\Application\UI\Control;
use Nette\Application\UI\Form;
use Nette\Utils\ArrayHash;

class NewsletterSignupControl extends Control
{
    /**
     * NewsletterSignupControl constructor.
     * @param NewsletterSignupManager $manager
     */
    public function __construct(
        private readonly NewsletterSignupManager $manager
    ) {
    }


    /**
     *
     */
    public function render(): void
    {
        $this->template->setFile(__DIR__ . '/NewsletterSignup.latte');
        $this->template->render();
    }


    /**
     * @return Form
     */
    protected function createComponentForm(): \Nette\Application\UI\Form
    {
        $form = new Form();
        $form->addEmail('email', 'E-mail')
            ->setRequired('Zadejte prosím svůj e-mail')
            ->addRule(Form::EMAIL, 'Toto není platná e-mailová adresa');
        $form->addSubmit('submit', 'Přihlásit odběr');

        $form->onSuccess[] = $this->formSucceeded(...);

        return $form;
    }


    /**
     * @param Form $form
     * @param ArrayHash $values
     * @throws \Nette\Application\AbortException
     */
    public function formSucceeded(Form $form, $values): void
    {
        try {
            $this->manager->add($values->email, 'Subscribed by newsletter form');
            $this->presenter->flashMessage('Váš e-mail jsme přidali k příjemcům zpráv o Barcampu');
            $this->presenter->redirect(':Homepage:');
        } catch (DuplicateNameException) {
            $form['email']->addError('Tento e-mail je již přihlášen.');
        }
    }
}
