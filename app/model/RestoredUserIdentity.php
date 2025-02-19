<?php

namespace App\Model;

use App\Orm\Identity;
use App\Orm\User;

class RestoredUserIdentity
{
    public function __construct(private readonly User $user, private readonly Identity $identity)
    {
    }


    /**
     * @return User
     */
    public function getUser(): \App\Orm\User
    {
        return $this->user;
    }


    /**
     * @return Identity
     */
    public function getIdentity(): \App\Orm\Identity
    {
        return $this->identity;
    }
}
