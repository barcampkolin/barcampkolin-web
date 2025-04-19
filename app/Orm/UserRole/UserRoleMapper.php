<?php

namespace App\Orm\UserRole;

use Nextras\Dbal\Platforms\Data\Fqn;
use Nextras\Orm\Mapper\Dbal\DbalMapper;

class UserRoleMapper extends DbalMapper
{
    public function getTableName(): Fqn|string
    {
        return 'user_role';
    }
}
