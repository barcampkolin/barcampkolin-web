<?php

namespace App\Orm\Talk;

use Nextras\Dbal\Platforms\Data\Fqn;
use Nextras\Orm\Mapper\Dbal\DbalMapper;

class TalkMapper extends DbalMapper
{
    protected $tableName = 'talk';
}
