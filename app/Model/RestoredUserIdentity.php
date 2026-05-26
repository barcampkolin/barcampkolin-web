<?php

namespace App\Model;

use App\Orm\Identity\Identity;
use App\Orm\User\User;

readonly class RestoredUserIdentity
{
    public function __construct(
        private User $user,
        private Identity $identity
    ) {
    }


    public function getUser(): User
    {
        return $this->user;
    }


    public function getIdentity(): Identity
    {
        return $this->identity;
    }
}
