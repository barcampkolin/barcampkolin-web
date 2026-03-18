<?php

namespace App\Orm\Conferee;

use Nextras\Dbal\Platforms\Data\Fqn;
use Nextras\Orm\Mapper\Dbal\Conventions\IConventions;
use Nextras\Orm\Mapper\Dbal\DbalMapper;

class ConfereeMapper extends DbalMapper
{

    #[\Override]
    public function getTableName(): string
    {
        return 'conferee';
    }

    #[\Override]
    protected function createConventions(): IConventions
    {
        $reflection = parent::createConventions();
        $reflection->addMapping('pictureUrl', 'picture_url');
        $reflection->addMapping('allowMail', 'allow_mail');

        return $reflection;
    }
}
