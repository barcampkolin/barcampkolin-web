<?php

namespace App\Orm\UserRole;

use App\Orm\User\User;
use Nextras\Orm\Entity\Entity;


/**
 * @property string                 $id             {primary}
 * @property User                   $user           {m:1 User::$role}
 * @property string                 $role
 */
class UserRole extends Entity
{
}
