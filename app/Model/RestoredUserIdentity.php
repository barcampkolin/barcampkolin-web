<?php

namespace App\Model;

use App\Orm\Identity\Identity;
use App\Orm\User\User;

class RestoredUserIdentity
{
    public function __construct(
        private readonly User $user,
        private readonly Identity $identity
    ) {
    }


    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }


    /**
     * @return Identity
     */
    public function getIdentity(): Identity
    {
        return $this->identity;
    }
}
