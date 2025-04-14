<?php

namespace App\Orm;

use App\Orm\Conferee\ConfereeRepository;
use App\Orm\File\FileRepository;
use App\Orm\Identity\IdentityRepository;
use App\Orm\Program\ProgramRepository;
use App\Orm\Talk\TalkRepository;
use App\Orm\User\UserRepository;
use App\Orm\UserRole\UserRoleRepository;
use Nextras\Orm\Model\Model;

/**
 * @property-read ConfereeRepository $conferee
 * @property-read FileRepository $file
 * @property-read IdentityRepository $identity
 * @property-read ProgramRepository $program
 * @property-read TalkRepository $talk
 * @property-read UserRepository $user
 * @property-read UserRoleRepository $role
 */
class Orm extends Model
{

}
