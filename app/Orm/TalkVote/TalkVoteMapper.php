<?php

namespace App\Orm;

use Nextras\Orm\Mapper\Mapper;

class TalkVoteMapper extends Mapper
{
    protected $tableName = 'talk_votes';

    protected function createStorageReflection()
    {
        $reflection = parent::createStorageReflection();
        $reflection->addMapping('votesCount', 'votes_count');
        return $reflection;
    }
}
