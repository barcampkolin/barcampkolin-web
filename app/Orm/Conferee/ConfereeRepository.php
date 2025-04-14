<?php

namespace App\Orm\Conferee;

use Nextras\Orm\Repository\Repository;

class ConfereeRepository extends Repository
{
    public static function getEntityClassNames(): array
    {
        return [Conferee::class];
    }
}
