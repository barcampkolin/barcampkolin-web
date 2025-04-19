<?php

namespace App\Orm\Identity;


use Nextras\Dbal\Platforms\Data\Fqn;
use Nextras\Orm\Mapper\Dbal\DbalMapper;

class IdentityMapper extends DbalMapper
{
    public function getTableName(): Fqn|string
    {
        return 'user_identity';
    }
}
