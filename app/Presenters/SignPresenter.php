<?php

namespace App\Presenters;

use App\Forms;
use App\Model\AuthenticationException as AppAuthenticationException;
use App\Model\Authenticator\Email as EmailAuthenticator;
use App\Model\ConfereeManager;
use App\Model\ConfereeNotFound;
use App\Model\EventInfoProvider;
use App\Model\IdentityManager;
use App\Model\IdentityNotFoundException;
use App\Model\MailerManager;
use App\Model\NoUserLoggedIn;
use App\Model\RestoredUserIdentity;
use App\Model\TalkManager;
use App\Model\UserManager;
use App\Model\UserNotFound;
use App\Orm\Conferee\Conferee;
use App\Orm\Identity\Identity;
use App\Orm\Talk\Talk;
use App\Orm\User\User;
use App\Orm\UserRole\UserRole;
use LogicException;
use Nette\Application\UI\Form;
use Nette\Http\IResponse;
use Nette\Http\SessionSection;
use Nette\Mail\SendException;
use Nette\Security\AuthenticationException;
use Nette\Security\SimpleIdentity;
use Nette\Utils\ArrayHash;
use Nette\Utils\Random;
use Nextras\Orm\Entity\Entity;
use Tracy\Debugger;
use Tracy\ILogger;

class SignPresenter extends BasePresenter
{
    /** @persistent */
    public string $backlink = '';

    /** @persistent */
    public string $token = '';


    /**
     * SignPresenter constructor.
     * @param Forms\SignInFormFactory $signInFormFactory
     * @param Forms\SignUpFormFactory $signUpFormFactory
     * @param Forms\ConfereeForm $confereeForm
     * @param Forms\TalkForm $talkForm
     * @param IdentityManager $identityManager
     * @param ConfereeManager $confereeManager
     * @param UserManager $userManager
     * @param TalkManager $talkManager
     * @param EventInfoProvider $eventInfoProvider
     * @param MailerManager $mailer
     * @param EmailAuthenticator $authenticator
     */
    public function __construct(
        private readonly Forms\SignInFormFactory $signInFormFactory,
        private readonly Forms\SignUpFormFactory $signUpFormFactory,
        private readonly Forms\ConfereeForm $confereeForm,
        private readonly Forms\TalkForm $talkForm,
        private readonly IdentityManager $identityManager,
        private readonly ConfereeManager $confereeManager,
        private readonly UserManager $userManager,
        private readonly TalkManager $talkManager,
        private readonly EventInfoProvider $eventInfoProvider,
        private readonly MailerManager $mailer,
        private readonly EmailAuthenticator $authenticator
    ) {
        parent::__construct();
    }

    public function renderIn(): void
    {
        if ($this->getUser()->isLoggedIn()) {
            $this->redirect('User:profil');
        }
    }


    public function renderUp(): void
    {
        if ($this->getUser()->isLoggedIn()) {
            $this->redirect('User:profil');
        }

        if (!$this->eventInfoProvider->getFeatures()['conferee']) {
            $this->flashMessage('Registrace ještě nejsou otevřeny, omlouváme se');
            $this->redirect('Homepage:');
        }
    }


    public function renderConferee(): void
    {
        if (!$this->eventInfoProvider->getFeatures()['conferee']) {
            $this->flashMessage('Registrace ještě nejsou otevřeny, omlouváme se');
            $this->redirect('Homepage:');
        }

        try {
            $user = $this->userManager->getByLoginUser($this->getUser());
        } catch (NoUserLoggedIn|UserNotFound $e) {
            // For cases: user not nogged or login user has no matches DB user (data integrity broken)
            $this->getUser()->logout();
            $this->redirect('up');
        }

        /** @var Form $form */
        $form = $this['confereeForm'];
        $form->setDefaults(
            [
                'name' => $user->name,
                'email' => $user->email,
            ]
        );
    }


    public function renderTalk(): void
    {
        try {
            $conferee = $this->userManager->getByLoginUser($this->getUser())->getObligatoryConferee();
        } catch (NoUserLoggedIn) {
            $this->flashMessage('Pro vypsání přednášky na Barcampu se prosím přihlaste nebo registrujte');
            $this->backlink = $this->storeRequest();
            $this->redirect('up');
        } catch (ConfereeNotFound) {
            $this->flashMessage('Pro vypsání přednášky se nejdříve registrujte jako účastník');
            $this->backlink = $this->storeRequest();
            $this->redirect('conferee');
        }

        if ($conferee->talk->count() > 0) {
            $this->flashMessage('Momentíček, Vy už přece máte přednášku vypsanou :)');
            $this->redirect('User:talk');
        }

        if (!$this->eventInfoProvider->getFeatures()['talks']) {
            $this->flashMessage('Vypisování přednášek není v tuto chvíli povoleno, omlouváme se');
            $this->redirect('Homepage:');
        }
    }


    public function renderResetPasswordSent($email): void
    {
        $domain = substr(strrchr((string)$email, "@"), 1);

        $this->template->mailUrl = $this->getMailboxByDomain($domain);
    }


    private function getMailboxByDomain(string $domain): string
    {
        switch ($domain) {
            case 'gmail.com':
                return 'https://mail.google.com/';
                break;
            case 'seznam.cz':
            case 'email.cz':
            case 'post.cz':
                return 'https://email.seznam.cz/';
                break;
            case 'outlook.cz':
            case 'outlook.com':
            case 'hotmail.com':
                return 'https://outlook.live.com/';
                break;
        }

        getmxrr($domain, $mxhosts);

        if (isset($mxhosts[0])) {
            if (preg_match('/google\.com$/', (string)$mxhosts[0])) {
                return 'https://mail.google.com/';
            } elseif (preg_match('/seznam\.cz$/', (string)$mxhosts[0])) {
                return 'https://email.seznam.cz/';
            } elseif (preg_match('/outlook\.com$/', (string)$mxhosts[0])) {
                return 'https://outlook.live.com/';
            }
        }

        return 'https://' . $domain;
    }


    protected function createComponentResetPasswordForm(): Form
    {
        $form = new Form();

        $form->addEmail('email', 'E-mail')
            ->setRequired('Vyplňte prosím e-mail');

        $form->addSubmit('submit', 'Odeslat žádost o nové heslo')
            ->setOption('itemClass', 'text-center')
            ->getControlPrototype()->setName('button')
            ->setText('Odeslat žádost o nové heslo');

        $form->onSuccess[] = function (Form $form, ArrayHash $values): void {
            try {
                $this->submitResetPasswordToken($values->email);
            } catch (IdentityNotFoundException) {
                $form['email']->addError('Na tento e-mail není nikdo registrován, nemůžeme mu tedy ani poslat heslo');
            } catch (SendException $e) {
                Debugger::log($e, ILogger::EXCEPTION);
                $form['email']->addError(
                    'Na zadaný e-mail se nám nedaří doručit zprávu s novým heslem – při doručování zprávy došlo k chybě.'
                );
            }
        };

        return $form;
    }


    public function submitResetPasswordToken(string $email): never
    {
        $token = $this->authenticator->createResetPasswordToken($email);

        $tokenUrl = $this->link('//resetPasswordConfirm', ['email' => $email, 'resetToken' => $token]);

        $this->mailer->getResetPasswordMessage($email, $tokenUrl)->send();

        $this->redirect('resetPasswordSent', ['email' => $email]);
    }


    public function renderResetPasswordConfirm(string $email, string $resetToken): void
    {
        try {
            $identity = $this->authenticator->getIdentityByResetPasswordToken($email, $resetToken);
        } catch (AppAuthenticationException $e) {
            Debugger::log($e);
            $this->flashMessage('Omlouváme se, ale odkaz je neplatný, možná zastaralý. Prosím zkuste to znovu');
            $this->redirect('resetPassword');
        }

        $this->template->username = $identity->user->name;

        /** @var Form $form */
        $form = $this['updatePasswordForm'];
        $form->setDefaults(
            [
                'email' => $email,
                'token' => $resetToken,
            ]
        );
    }


    /**
     * @return Form
     */
    protected function createComponentUpdatePasswordForm(): Form
    {
        $form = new Form();

        $form->addHidden('email');
        $form->addHidden('token');

        $form->addPassword('password', 'Nové heslo')
            ->setOption('description', sprintf('alespoň %d znaků', Forms\SignUpFormFactory::PASSWORD_MIN_LENGTH))
            ->setRequired('Vytvořte si prosím heslo')
            ->addRule($form::MIN_LENGTH, null, Forms\SignUpFormFactory::PASSWORD_MIN_LENGTH);

        $form->addSubmit('submit', 'Nastavit heslo')
            ->setOption('itemClass', 'text-center')
            ->getControlPrototype()->setName('button')
            ->setText('Nastavit nové heslo');

        $form->onSuccess[] = function (Form $form, $values): void {
            $this->resetPassword($values->email, $values->token, $values->password);
        };

        return $form;
    }


    /**
     * @param $email
     * @param $resetToken
     * @param $password
     * @throws \App\Model\TokenInvalidException
     * @throws \App\Model\UserNotFoundException
     * @throws \Nette\Application\AbortException
     * @throws \Nette\Utils\JsonException
     */
    public function resetPassword($email, $resetToken, $password): never
    {
        $identity = $this->authenticator->getIdentityByResetPasswordToken($email, $resetToken);

        $this->authenticator->invalidateResetPasswordToken($identity);

        $this->authenticator->setPassword($identity, $password);

        $this->flashMessage('Heslo bylo nastaveno, nyní se můžeš přihlásit.');

        $this->redirect('in');
    }


    public function actionOut(): never
    {
        $this->getUser()->logout();

        $this->flashMessage('Jste odhlášeni');
        $this->redirect('Homepage:');
    }


    /**
     * Sign-in form factory.
     */
    protected function createComponentSignInForm(): Form
    {
        return $this->signInFormFactory->create(
            function (Identity $identity): void {
                $user = $identity->user;

                if (!$user instanceof User) {
                    $userId = $identity->id;
                    throw new LogicException("No user was found for identity ID: $userId, that's integrity data error");
                }

                $this->login($user);

                $this->restoreRequest($this->backlink);
                $this->redirect('User:profil');
            }
        );
    }


    protected function createComponentSignUpForm(): Form
    {
        return $this->signUpFormFactory->create(
            function (Identity $identity): void {
                $user = new User();
                $user->email = $identity->key;

                $this->userManager->save($user);

                $identity->user = $user;
                $this->identityManager->save($identity);

                $this->login($user);

                $this->redirect('conferee');
            }
        );
    }

    protected function createComponentConfereeForm(): Form
    {
        $onSubmitCallback = function (Conferee $conferee): void {
            $user = $this->userManager->getByLoginUser($this->getUser());
            $identity = $user->identity->getIterator()->fetch();

            if(!$identity instanceof Identity) {
                throw new LogicException("No identity was found for user ID: {$user->id}, that's integrity data error");
            }

            $user->name = $conferee->name;
            $user->email = $conferee->email;

            $conferee->pictureUrl = $user->pictureUrl;
            $conferee->user = $user;

            $user->addRole('conferee');

            $this->userManager->save($user);
            $this->confereeManager->save($conferee);
            $this->identityManager->save($identity);

            $this->login($user);

            $flashMessage = 'Právě jste se zaregistrovali na Barcamp!';

            try {
                $this->mailer->getRegistrationMessage($user->email)->send();
            } catch (SendException $e) {
                Debugger::log($e, ILogger::EXCEPTION);
                $flashMessage .= ' Nicméně na Váš e-mail bohužel nebylo možné potvrzení doručit.';
            }

            $this->flashMessage($flashMessage);
            $this->restoreRequest($this->backlink);
            $this->redirect('User:profil');
        };

        return $this->confereeForm->create($onSubmitCallback);
    }


    protected function createComponentTalkForm(): Form
    {
        $onSubmitCallback = function (Talk $talk): void {
            $conferee = $this->userManager->getByLoginUser($this->getUser())->getObligatoryConferee();

            $talk->conferee = $conferee;
            $conferee->user->addRole('speaker');

            $this->talkManager->save($talk);

            //Reset app login - to reload roles
            $this->login($conferee->user);

            $this->flashMessage('Hurá! Máš zapsanou přednášku, díky!');
            $this->redirect('User:profil');
        };

        $categories = $this->talkManager->getCategories();
        $durations = $this->talkManager->getDurations();

        return $this->talkForm->create($onSubmitCallback, $categories, $durations);
    }


    public function login(User $user): void
    {
        $roles = [];
        /** @var UserRole $role */
        foreach ($user->role as $role) {
            $roles[] = $role->role;
        }


        $appIdentity = new SimpleIdentity(
            $user->id,
            $roles,
            [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'pictureUrl' => $user->pictureUrl,
            ]
        );

        $this->getUser()->login($appIdentity);
    }
}
