<?php

namespace App\Orm\Identity;

use Nextras\Orm\Repository\Repository;

/**
 * @extends Repository<Identity>
 */
class IdentityRepository extends Repository
{
    public static function getEntityClassNames(): array
    {
        return [Identity::class];
    }
}
