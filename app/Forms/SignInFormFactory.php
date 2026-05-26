<?php

namespace App\Forms;

use App\Model\AuthenticationException;
use App\Model\Authenticator\Email as EmailAuthenticator;
use App\Model\PasswordMismatchException;
use App\Model\UserNotFoundException;
use Nette;
use Nette\Application\UI\Form;
use Nette\Forms\Controls\BaseControl;
use Nette\Security\User;

class SignInFormFactory
{
    use Nette\SmartObject;

    private User $user;


    public function __construct(
        private readonly FormFactory $factory,
        private readonly EmailAuthenticator $authenticator
    ) {
    }


    public function create(callable $onSuccess): Form
    {
        $form = $this->factory->create();
        $form->addText('email', 'E-mail:')
            ->setRequired('Prosím, vyplňte e-mail');

        $form->addPassword('password', 'Heslo:')
            ->setRequired('Prosím, zadejte heslo');

        $form->addSubmit('send', 'Přihlásit')
            ->setOption('itemClass', 'text-center')
            ->getControlPrototype()->setName('button')->setText('Přihlásit');

        $form->onSuccess[] = function (Form $form, $values) use ($onSuccess): void {
            try {
                $identity = $this->authenticator->getIdentityByAuth($values->email, $values->password);
                $onSuccess($identity);
            } catch (AuthenticationException $e) {
                $form->addError('Přihlášení se nepovedlo');
                if ($e instanceof UserNotFoundException) {
                    /** @var BaseControl $emailControl */
                    $emailControl = $form['email'];
                    $emailControl->addError('Toto jméno jsme u nás nenalezli. Jste již registrováni?');
                }
                if ($e instanceof PasswordMismatchException) {
                    /** @var BaseControl $passwordControl */
                    $passwordControl = $form['password'];
                    $passwordControl->addError('Heslo se neshoduje, zkuste to prosím znovu.');
                }
            }
        };

        return $form;
    }
}

