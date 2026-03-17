<?php

namespace App\Orm\Program;

use Nextras\Orm\Repository\Repository;

/**
 * @extends Repository<Program>
 */
class ProgramRepository extends Repository
{
    public static function getEntityClassNames(): array
    {
        return [Program::class];
    }
}
