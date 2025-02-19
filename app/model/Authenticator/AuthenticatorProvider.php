<?php

namespace App\Model\Authenticator;

use Nette\ArgumentOutOfRangeException;

/**
 * Class IdentityAuthenticatorProvider
 * @package App\Model
 */
class AuthenticatorProvider
{
    /** @var IAuthenticator[] */
    private array $authenticators = [];


    public function __construct(
    ) {
    }


    /**
     * @param string $platform
     * @return IAuthenticator
     * @throws ArgumentOutOfRangeException
     */
    public function provide($platform)
    {
        if (!isset($this->authenticators[$platform])) {
            $allowed = implode('", "', array_keys($this->authenticators));
            throw new ArgumentOutOfRangeException(
                sprintf('Unknown authenticator "%s", use one of these: "%s".', $platform, $allowed)
            );
        }

        return $this->authenticators[$platform];
    }
}
