<?php

namespace App\Orm;

use Nextras\Dbal\Platforms\Data\Fqn;
use Nextras\Orm\Mapper\Dbal\Conventions\IConventions;
use Nextras\Orm\Mapper\Dbal\DbalMapper;

class UserMapper extends DbalMapper
{
    protected string|null|Fqn $tableName = 'user';

    protected function createConventions(): IConventions
    {
        $reflection = parent::createConventions();
        $reflection->addMapping('pictureUrl', 'picture_url');

        return $reflection;
    }
}
