<?php

namespace App\Orm\User;

use Nextras\Orm\Repository\Repository;

/**
 * @extends Repository<User>
 */
class UserRepository extends Repository
{
    public static function getEntityClassNames(): array
    {
        return [User::class];
    }
}
