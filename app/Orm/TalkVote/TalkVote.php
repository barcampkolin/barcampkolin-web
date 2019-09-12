<?php
declare(strict_types=1);

namespace App\Orm;

use Nextras\Orm\Entity\Entity;
use Nextras\Orm\Relationships\ManyHasOne;

/**
 * @property string                 $id            {primary}
 * @property Talk                   $talk          {m:1 Talk::$votes}
 * @property User                   $user          {m:1 User::$votes}
 */

class TalkVote extends Entity
{
}
