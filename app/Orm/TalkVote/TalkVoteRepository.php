<?php

namespace App\Orm;

use Nextras\Orm\Repository\Repository;

class TalkVoteRepository extends Repository
{
    public static function getEntityClassNames(): array
    {
        return [TalkVote::class];
    }
}
