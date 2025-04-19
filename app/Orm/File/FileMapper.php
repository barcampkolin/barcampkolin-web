<?php

namespace App\Orm\File;

use Nextras\Dbal\Platforms\Data\Fqn;
use Nextras\Orm\Mapper\Dbal\DbalMapper;

class FileMapper extends DbalMapper
{
    public function getTableName(): Fqn|string
    {
        return 'file';
    }
}
