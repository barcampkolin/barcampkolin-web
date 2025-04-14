<?php

namespace App\Orm\UserRole;

use Nextras\Orm\Repository\Repository;

class UserRoleRepository extends Repository
{
    public static function getEntityClassNames(): array
    {
        return [UserRole::class];
    }
}
