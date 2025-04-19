<?php

namespace App\Orm\User;

use App\Model\ConfereeNotFound;
use App\Orm\Conferee\Conferee;
use App\Orm\Identity\Identity;
use App\Orm\UserRole\UserRole;
use Nextras\Orm\Entity\Entity;
use Nextras\Orm\Relationships\OneHasMany;

/**
 * @property int                    $id            {primary}
 * @property string|null            $email
 * @property string|null            $name
 * @property string|null            $pictureUrl
 * @property OneHasMany|Identity[]  $identity       {1:m Identity::$user}
 * @property Conferee|null          $conferee       {1:1 Conferee::$user}
 * @property OneHasMany|UserRole[]  $role           {1:m UserRole::$user}
 */
class User extends Entity
{
    /**
     * @throws ConfereeNotFound
     */
    public function getObligatoryConferee(): Conferee
    {
        $conferee = $this->conferee;

        if ($conferee === null) {
            throw new ConfereeNotFound();
        }

        return $conferee;
    }


    public function addRole(string $roleName): void
    {
        $role = new UserRole();
        $role->role = $roleName;
        $role->user = $this;
    }
}
