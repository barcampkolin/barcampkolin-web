<?php

namespace App\Orm\Talk;

use Nextras\Dbal\Platforms\Data\Fqn;
use Nextras\Orm\Mapper\Dbal\DbalMapper;

class TalkMapper extends DbalMapper
{
    #[\Override]
    public function getTableName(): Fqn|string
    {
        return 'talk';
    }
}
