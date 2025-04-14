<?php

namespace App\Orm\File;

use Nextras\Orm\Entity\Entity;

/**
 * @property int                        $id            {primary}
 * @property string                     $url
 * @property string                     $name
 * @property \DateTimeImmutable         $created        {default now}
 */

class File extends Entity
{

}
