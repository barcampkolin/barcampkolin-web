<?php

namespace App\Orm\Program;

use Nextras\Dbal\Platforms\Data\Fqn;
use Nextras\Orm\Mapper\Dbal\DbalMapper;

class ProgramMapper extends DbalMapper
{
    public function getTableName(): Fqn|string
    {
        return 'program';
    }
}
