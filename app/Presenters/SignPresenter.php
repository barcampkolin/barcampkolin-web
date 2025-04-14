<?php

namespace App\Presenters;

use App\Forms;
use App\Model\AuthenticationException as AppAuthenticationException;
use App\Model\Authenticator\AuthenticatorProvider;
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
use Nette\Application\UI\Form;
use Nette\Http\IResponse;
use Nette\Http\Response;
use Nette\Mail\SendException;
use Nette\Security\AuthenticationException;
use Nette\Utils\Random;
use Nextras\Orm\Entity\Entity;
use Nextras\Orm\Entity\ToArrayConverter;
use Tracy\Debugger;
use Tracy\ILogger;
use Tracy\Logger;

class SignPresenter extends BasePresenter
{
    /** @persistent */
    public $backlink = '';

    /** @persistent */
    public $token = '';


    /**
     * SignPresenter constructor.
     * @param AuthenticatorProvider $authenticatorProvider
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
        private readonly AuthenticatorProvider $authenticatorProvider,
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


    /**
     * @param string $platform
     * @throws \Nette\Application\AbortException
     */
    public function actionFederatedLogin($platform): void
    {
        $this->getSession()->start();
        $callbackUrl = $this->link('//federatedCallback', ['platform' => $platform, 'backlink' => null]);
        $loginUrl = $this->getAuthenticator($platform)->getLoginUrl($callbackUrl, $this->backlink);
        $this->redirectUrl($loginUrl, Response::S303_POST_GET);
    }


    /**
     * @param string $platform
     * @throws AuthenticationException
     * @throws \Nette\Application\AbortException
     * @throws \Nette\Utils\JsonException
     */
    public function actionFederatedCallback($platform): void
    {
        try {
            $authenticator = $this->getAuthenticator($platform);
            $this->backlink = $authenticator->getBacklink($this->getHttpRequest(), $this->backlink);
            $identity = $authenticator->authenticate($this->getHttpRequest());
        } catch (AuthenticationException) {
            $this->flashMessage('Omlouváme, přihlášení se nepovedlo. Zkuste to prosím znovu.');
            $this->redirect('in');
            return;
        }

        try {
            $identity = $this->identityManager->getIdentityByIdentity($identity);
        } catch (IdentityNotFoundException) {
            $this->identityManager->save($identity);
        }

        $user = $identity->user;

        if ($user) {
            $this->login($user);
            $this->restoreRequest($this->backlink);
            $this->redirect('User:profil');
        } else {
            $user = new User();
            $authenticator->fillUserWithIdentity($user, $identity);

            $this->storeEntity($identity, Identity::class);
            $this->storeEntity($user, User::class);
            $this->redirect('conferee');
        }
    }


    /**
     * @throws UserNotFound
     * @throws \Nette\Application\AbortException
     */
    public function renderIn(): void
    {
        try {
            $this->userManager->getByLoginUser($this->user);

            //When user loaded - already loggedIn
            $this->redirect('User:profil');
        } catch (NoUserLoggedIn) {
            //Expected state - user must not be logged
        }
    }


    /**
     * @throws UserNotFound
     * @throws \Nette\Application\AbortException
     * @throws \Nette\Utils\JsonException
     */
    public function renderUp(): void
    {
        try {
            $this->userManager->getByLoginUser($this->user);

            //When user loaded - already loggedIn
            $this->redirect('User:profil');
        } catch (NoUserLoggedIn) {
            //Expected state - user must not be logged
        }

        if (!$this->eventInfoProvider->getFeatures()['conferee']) {
            $this->flashMessage('Registrace ještě nejsou otevřeny, omlouváme se');
            $this->redirect('Homepage:');
        }
    }


    /**
     * @throws \Nette\Application\AbortException
     * @throws \Nette\Application\BadRequestException
     * @throws UserNotFound
     * @throws \Nette\Utils\JsonException
     */
    public function renderConferee(): void
    {
        if (!$this->eventInfoProvider->getFeatures()['conferee']) {
            $this->flashMessage('Registrace ještě nejsou otevřeny, omlouváme se');
            $this->redirect('Homepage:');
        }

        $restoredUserIdentity = $this->getRestorableUserIdentity();

        $user = $restoredUserIdentity->getUser();

        /** @var Form $form */
        $form = $this['confereeForm'];
        $form->setDefaults(
            [
                'name' => $user->name,
                'email' => $user->email,
            ]
        );
    }


    /**
     * @throws UserNotFound
     * @throws \Nette\Application\AbortException
     * @throws \Nette\Utils\JsonException
     */
    public function renderTalk(): void
    {
        try {
            $conferee = $this->userManager->getByLoginUser($this->user)->getObligatoryConferee();
        } catch (NoUserLoggedIn) {
            $this->flashMessage('Pro vypsání přednášky na Barcampu se prosím přihlaste nebo registrujte');
            $this->backlink = $this->storeRequest();
            $this->redirect('up');
            return;
        } catch (ConfereeNotFound) {
            $this->flashMessage('Pro vypsání přednášky se nejdříve registrujte jako účastník');
            $this->backlink = $this->storeRequest();
            $this->redirect('conferee');
            return;
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


    /**
     *
     */
    public function renderResetPasswordSent($email): void
    {
        $domain = substr(strrchr((string) $email, "@"), 1);

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
            if (preg_match('/google\.com$/', (string) $mxhosts[0])) {
                return 'https://mail.google.com/';
            } elseif (preg_match('/seznam\.cz$/', (string) $mxhosts[0])) {
                return 'https://email.seznam.cz/';
            } elseif (preg_match('/outlook\.com$/', (string) $mxhosts[0])) {
                return 'https://outlook.live.com/';
            }
        }

        return 'https://' . $domain;
    }


    /**
     * @return Form
     */
    protected function createComponentResetPasswordForm(): \Nette\Application\UI\Form
    {
        $form = new Form();

        $form->addEmail('email', 'E-mail')
            ->setRequired('Vyplňte prosím e-mail');

        $form->addSubmit('submit', 'Odeslat žádost o nové heslo')
            ->setOption('itemClass', 'text-center')
            ->getControlPrototype()->setName('button')
            ->setText('Odeslat žádost o nové heslo');

        $form->onSuccess[] = function (Form $form, $values): void {
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


    /**
     * @param string $email
     * @throws IdentityNotFoundException
     * @throws SendException
     * @throws \App\Model\EntityNotFound
     * @throws \Nette\Application\AbortException
     * @throws \Nette\Utils\JsonException
     */
    public function submitResetPasswordToken($email): void
    {
        $token = $this->authenticator->createResetPasswordToken($email);

        $tokenUrl = $this->link('//resetPasswordConfirm', ['email' => $email, 'resetToken' => $token]);

        $this->mailer->getResetPasswordMessage($email, $tokenUrl)->send();

        $this->redirect('resetPasswordSent', ['email' => $email]);
    }


    /**
     * @param string $email
     * @param string $resetToken
     * @throws \Nette\Application\AbortException
     * @throws \Nette\Utils\JsonException
     */
    public function renderResetPasswordConfirm($email, $resetToken): void
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
    protected function createComponentUpdatePasswordForm(): \Nette\Application\UI\Form
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
    public function resetPassword($email, $resetToken, $password): void
    {
        $identity = $this->authenticator->getIdentityByResetPasswordToken($email, $resetToken);

        $this->authenticator->invalidateResetPasswordToken($identity);

        $this->authenticator->setPassword($identity, $password);

        $this->flashMessage('Heslo bylo nastaveno, nyní se můžeš přihlásit.');

        $this->redirect('in');
    }


    /**
     *
     * @throws \Nette\Application\AbortException
     */
    public function actionOut(): void
    {
        $this->getUser()->logout();

        $this->flashMessage('Jste odhlášeni');
        $this->redirect('Homepage:');
    }


    /**
     * Sign-in form factory.
     * @return Form
     */
    protected function createComponentSignInForm()
    {
        return $this->signInFormFactory->create(
            function (Identity $identity): void {
                $user = $identity->user;
                if (!$user instanceof User) {
                    $this->redirect('conferee');
                }

                $this->login($user);

                $this->restoreRequest($this->backlink);
                $this->redirect('User:profil');
            }
        );
    }


    /**
     * Sign-up form factory.
     * @return Form
     */
    protected function createComponentSignUpForm()
    {
        return $this->signUpFormFactory->create(
            function (Identity $identity): void {
                $user = new User();
                $user->email = $identity->key;

                $this->storeEntity($identity, Identity::class);
                $this->storeEntity($user, User::class);
                $this->redirect('conferee');
            }
        );
    }


    /**
     * @return Form
     */
    protected function createComponentConfereeForm()
    {
        /**
         * @param \App\Orm\Conferee\Conferee $conferee
         * @throws AuthenticationException
         * @throws UserNotFound
         * @throws \App\Model\EntityNotFound
         * @throws \Nette\Application\AbortException
         * @throws \Nette\Application\BadRequestException
         * @throws \Nette\Utils\JsonException
         */
        $onSubmitCallback = function ($conferee): void {
            $restoredUserIdentity = $this->getRestorableUserIdentity();

            $user = $restoredUserIdentity->getUser();
            $identity = $restoredUserIdentity->getIdentity();

            $this->userManager->save($user);
            $this->identityManager->save($identity);
            $this->confereeManager->save($conferee);

            $user->name = $conferee->name;
            $user->email = $conferee->email;

            //Currently not working on weird ORM bug
            $identity->user = $user;

            $conferee->pictureUrl = $user->pictureUrl;
            $conferee->user = $user;

            $this->userManager->save($user);

            //dirty hack to weird ORM bug
            $identity->setRawValue('user', $user->id);
            $this->identityManager->save($identity, false);
            //hack end

            $user->addRole('conferee');
            $this->userManager->save($user);

            $this->login($user);
            $this->removePartialLoginSession();

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


    /**
     * @return Form
     * @throws \App\Model\InvalidEnumeratorSetException
     * @throws \Nette\Utils\JsonException
     */
    protected function createComponentTalkForm()
    {
        /**
         * @param \App\Orm\Talk\Talk $talk
         * @throws ConfereeNotFound
         * @throws NoUserLoggedIn
         * @throws UserNotFound
         * @throws \Nette\Application\AbortException
         * @throws \Nette\Security\AuthenticationException
         */
        $onSubmitCallback = function (Talk $talk): void {
            $conferee = $this->userManager->getByLoginUser($this->user)->getObligatoryConferee();

            $talk->conferee = $conferee;
            $conferee->user->addRole('speaker');

            $this->talkManager->save($talk);

            //Reset app login - to reload roles
            $this->login($conferee->user);

            $this->flashMessage('Hurá! Máate zapsanou přednášku, díky!');
            $this->redirect('User:profil');
        };

        $categories = $this->talkManager->getCategories();
        $durations = $this->talkManager->getDurations();

        return $this->talkForm->create($onSubmitCallback, $categories, $durations);
    }


    /**
     * @param User $user
     * @throws \Nette\Security\AuthenticationException
     */
    private function login(User $user): void
    {
        $roles = [];
        /** @var UserRole $role */
        foreach ($user->role as $role) {
            $roles[] = $role->role;
        }


        $appIdentity = new \Nette\Security\Identity(
            $user->id,
            $roles,
            [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'pictureUrl' => $user->pictureUrl,
            ]
        );

        $this->user->login($appIdentity);
    }


    /**
     * @param string $platform
     * @return \App\Model\Authenticator\IAuthenticator
     */
    private function getAuthenticator($platform)
    {
        return $this->authenticatorProvider->provide($platform);
    }


    /**
     * Get User & Identity from restored object (created by partial login) or load it from logged user
     * @return RestoredUserIdentity
     * @throws UserNotFound
     * @throws \Nette\Application\AbortException
     * @throws \Nette\Application\BadRequestException
     */
    protected function getRestorableUserIdentity(): \App\Model\RestoredUserIdentity
    {
        $user = null;

        try {
            $user = $this->userManager->getByLoginUser($this->user);
            if ($user->conferee) {
                $this->redirect('User:profil');
            }
        } catch (NoUserLoggedIn) {
            // Reuired exception, no action
        }

        /** @var \App\Orm\Identity\Identity|null $identity */
        $identity = $this->restoreEntity(Identity::class);

        if ($identity instanceof Identity === false && $user instanceof User) {
            $identities = $user->identity;

            if ($identities->count() > 0) {
                foreach ($identities as $oneIdentity) {
                    $identity = $oneIdentity;
                    break;
                }
            }
        }

        if ($identity instanceof Identity === false) {
            $this->flashMessage('Pro účast na Barcampu se prosím nejdříve přihlaste nebo registrujte');
            $this->redirect('up');
        }

        if ($user instanceof User === false) {
            $user = $identity->user;
        }

        if ($user instanceof User === false) {
            /** @var User|null $user */
            $user = $this->restoreEntity(User::class);
        }

        if ($user instanceof User === false) {
            Debugger::log('Při obnovení profilu pro dokončení registraci se nezachoval User', Logger::ERROR);
            $this->error('Chyba konzistence dat', IResponse::S500_INTERNAL_SERVER_ERROR);
        }

        return new RestoredUserIdentity($user, $identity);
    }


    /**
     * @param Entity $entity
     * @param string $key
     */
    private function storeEntity(Entity $entity, string $key): void
    {
        $session = $this->getPartialLoginSession(true);

        $session->{$key} = [
            'class' => $entity::class,
            'entity' => $entity->toArray(ToArrayConverter::RELATIONSHIP_AS_ID)
        ];
    }


    /**
     * @param string $key
     * @return Entity|null
     */
    private function restoreEntity(string $key)
    {
        $session = $this->getPartialLoginSession();
        if ($session === null || isset($session->{$key}) === false) {
            return null;
        }

        $entityPack = $session->{$key};
        $class = $entityPack['class'];

        /** @var Entity $entity */
        $entity = new $class();
        foreach ($entityPack['entity'] as $name => $value) {
            if ($value === null || (is_array($value) && empty($value))) {
                continue;
            }
            $entity->setRawValue($name, $value);
        }

        return $entity;
    }


    /**
     * @param bool $create
     * @return \Nette\Http\Session|\Nette\Http\SessionSection|null
     */
    private function getPartialLoginSession(bool $create = false)
    {
        if (!$this->token) {
            if ($create) {
                $this->token = Random::generate(5);
            } else {
                return null;
            }
        }

        $session = $this->getSession('part-login-storage/' . $this->token);
        $session->setExpiration('15 minutes');
        return $session;
    }


    /**
     *
     */
    private function removePartialLoginSession(): void
    {
        if ($session = $this->getPartialLoginSession()) {
            $session->remove();
            $this->token = '';
        }
    }
}
