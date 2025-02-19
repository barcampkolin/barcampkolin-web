<?php

namespace App\Orm;

use Nextras\Dbal\Platforms\Data\Fqn;
use Nextras\Orm\Mapper\Dbal\DbalMapper;

class UserRoleMapper extends DbalMapper
{
    protected $tableName = 'user_role';
}
