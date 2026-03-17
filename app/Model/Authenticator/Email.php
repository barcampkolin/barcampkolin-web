<?php

declare(strict_types=1);

namespace App\Model\Authenticator;

use App\Model\DuplicateNameException;
use App\Model\IdentityManager;
use App\Model\IdentityNotFoundException;
use App\Model\PasswordMismatchException;
use App\Model\TokenInvalidException;
use App\Model\UserNotFoundException;
use App\Orm\Identity\Identity;
use Nette\Utils\DateTime;
use Nette\Utils\Json;
use Nette\Utils\Random;

class Email
{
    public const string PLATFORM_KEY = 'email';


    public function __construct(
        private readonly IdentityManager $identityManager
    ) {
    }


    public function getIdentityByAuth(string $email, string $password): Identity
    {
        try {
            $identity = $this->getIdentityByEmail($email);
        } catch (IdentityNotFoundException) {
            throw new UserNotFoundException();
        }

        $this->verifyIdentityPassword($identity, $password);

        return $identity;
    }


    public function getIdentityByResetPasswordToken(string $email, string $token): Identity
    {
        try {
            $identity = $this->getIdentityByEmail($email);
        } catch (IdentityNotFoundException) {
            throw new UserNotFoundException();
        }

        $this->verifyIdentityResetPasswordToken($identity, $token);

        return $identity;
    }


    protected function verifyIdentityPassword(Identity $identity, string $password): void
    {
        if (password_verify($password, (string)$identity->token) === false) {
            throw new PasswordMismatchException();
        }
    }


    protected function verifyIdentityResetPasswordToken(Identity $identity, string $token): void
    {
        $details = [];
        if ($identity->identity) {
            $details = Json::decode($identity->identity, forceArrays: true);
        }

        if (!isset($details['resetPassword']['token'])) {
            throw new TokenInvalidException('Token does not exists');
        }

        if ($details['resetPassword']['token'] !== $token) {
            throw new TokenInvalidException("Token mismatch");
        }

        $expirationDate = new DateTime($details['resetPassword']['expiration']);
        $now = new DateTime();
        if ($expirationDate < $now) {
            throw new TokenInvalidException('Token already expired');
        }
    }


    public function createNewIdentity(string $email, string $password): Identity
    {
        $identity = null;

        try {
            $identity = $this->getIdentityByEmail($email);
        } catch (IdentityNotFoundException) {
            // required
        }

        if ($identity instanceof Identity) {
            throw new DuplicateNameException();
        }

        $identity = new Identity();

        $identity->platform = self::PLATFORM_KEY;
        $identity->key = $email;
        $identity->token = password_hash($password, PASSWORD_DEFAULT);

        return $identity;
    }


    public function createResetPasswordToken(string $email): string
    {
        $identity = $this->getIdentityByEmail($email);

        $details = [];
        if ($identity->identity) {
            $details = Json::decode($identity->identity, forceArrays: true);
        }


        $token = Random::generate(30);
        $details['resetPassword'] = [
            'token' => $token,
            'expiration' => date('c', time() + (3600 * 24)),
        ];

        $identity->identity = Json::encode($details);
        $this->identityManager->save($identity);

        return $token;
    }


    public function invalidateResetPasswordToken(Identity $identity): void
    {
        $details = [];
        if ($identity->identity) {
            $details = Json::decode($identity->identity, forceArrays:true);
        }

        unset($details['resetPassword']);

        $identity->identity = Json::encode($details);
        $this->identityManager->save($identity);
    }


    public function setPassword(Identity $identity, string $password): void
    {
        $identity->token = password_hash($password, PASSWORD_DEFAULT);
        $this->identityManager->save($identity);
    }


    protected function getIdentityByEmail(string $email): Identity
    {
        return $this->identityManager->getIdentity(self::PLATFORM_KEY, $email);
    }

}
