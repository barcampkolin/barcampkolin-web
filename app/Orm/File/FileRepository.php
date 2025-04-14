<?php

namespace App\Orm\File;

use Nextras\Orm\Repository\Repository;

class FileRepository extends Repository
{
    public static function getEntityClassNames(): array
    {
        return [File::class];
    }
}
