<?php

namespace App\Orm;

use Nextras\Dbal\Platforms\Data\Fqn;
use Nextras\Orm\Mapper\Dbal\DbalMapper;

class FileMapper extends DbalMapper
{
    protected $tableName = 'file';
}
