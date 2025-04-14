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
     * @return \App\Orm\User\User
     */
    public function getUser(): User\User
    {
        return $this->user;
    }


    /**
     * @return \App\Orm\Identity\Identity
     */
    public function getIdentity(): Identity\Identity
    {
        return $this->identity;
    }
}
