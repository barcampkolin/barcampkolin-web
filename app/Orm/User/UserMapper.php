<?php

namespace App\Orm\User;

use Nextras\Dbal\Platforms\Data\Fqn;
use Nextras\Orm\Mapper\Dbal\Conventions\IConventions;
use Nextras\Orm\Mapper\Dbal\DbalMapper;

class UserMapper extends DbalMapper
{
    public function getTableName(): Fqn|string
    {
        return 'user';
    }

    protected function createConventions(): IConventions
    {
        $reflection = parent::createConventions();
        $reflection->addMapping('pictureUrl', 'picture_url');

        return $reflection;
    }
}
