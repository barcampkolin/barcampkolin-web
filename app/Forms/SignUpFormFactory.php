<?php

namespace App\Forms;

use App\Model\Authenticator\Email as EmailAuthenticator;
use App\Model\DuplicateNameException;
use Nette;
use Nette\Application\UI\Form;

readonly class SignUpFormFactory
{
    use Nette\SmartObject;

    public const int PASSWORD_MIN_LENGTH = 5;


    public function __construct(
        private FormFactory $factory,
        private EmailAuthenticator $authenticator
    ) {
    }


    public function create(callable $onSuccess): Form
    {
        $form = $this->factory->create();
        $form->addEmail('email', 'Váš e-mail:')
            ->setRequired('Prosím zadejte svůj e-mail');

        $form->addPassword('password', 'Vytvořte si heslo:')
            ->setOption('description', sprintf('alespoň %d znaků', self::PASSWORD_MIN_LENGTH))
            ->setRequired('Vytvořte si prosím heslo')
            ->addRule($form::MinLength, null, self::PASSWORD_MIN_LENGTH);

        $form->addSubmit('send', 'Registrovat')
            ->setOption('itemClass', 'text-center')
            ->getControlPrototype()->setName('button')->setText('Registrovat');

        $form->onSuccess[] = function (Form $form, $values) use ($onSuccess): void {
            try {
                $identity = $this->authenticator->createNewIdentity($values->email, $values->password);
                $onSuccess($identity);
            } catch (DuplicateNameException) {
                $form['email']->addError('Tento e-mail už u nás máte, zkuste se příhlásit');
                return;
            }
        };

        return $form;
    }
}
