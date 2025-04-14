<?php

namespace App\Orm\User;

use App\Model\ConfereeNotFound;
use App\Orm\Conferee\Conferee;
use App\Orm\Identity\Identity;
use App\Orm\UserRole\UserRole;
use Nextras\Orm\Entity\Entity;
use Nextras\Orm\Relationships\OneHasMany;

/**
 * @property string                 $id            {primary}
 * @property string|null            $email
 * @property string|null            $name
 * @property string|null            $pictureUrl
 * @property OneHasMany|Identity[]  $identity       {1:m Identity::$user}
 * @property \App\Orm\Conferee\Conferee|null          $conferee       {1:1 Conferee::$user}
 * @property OneHasMany|UserRole[]  $role           {1:m UserRole::$user}
 */
class User extends Entity
{
    /**
     * @return \App\Orm\Conferee\Conferee
     * @throws ConfereeNotFound
     */
    public function getObligatoryConferee()
    {
        $conferee = $this->conferee;

        if ($conferee === null) {
            throw new ConfereeNotFound();
        }

        return $conferee;
    }


    /**
     * @param $roleName
     */
    public function addRole($roleName): void
    {
        $role = new UserRole();
        $role->role = $roleName;
        $role->user = $this;
    }
}
