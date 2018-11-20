<?php

namespace App\Orm;

use Nextras\Orm\Repository\Repository;

class FileRepository extends Repository
{
    public static function getEntityClassNames()
    {
        return [File::class];
    }
}
