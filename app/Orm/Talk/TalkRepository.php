<?php

namespace App\Orm\Talk;

use Nextras\Orm\Repository\Repository;

class TalkRepository extends Repository
{
    public static function getEntityClassNames(): array
    {
        return [Talk::class];
    }
}
