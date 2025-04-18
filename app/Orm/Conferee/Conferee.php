<?php

namespace App\Orm\Conferee;

use App\Orm\Talk\Talk;
use App\Orm\User\User;
use Nextras\Orm\Entity\Entity;
use Nextras\Orm\Relationships\OneHasMany;

/**
 * @property int                        $id            {primary}
 * @property User|null                  $user          {1:1 User::$conferee, isMain=true}
 * @property string                     $name
 * @property string                     $email
 * @property string|null                $pictureUrl
 * @property string|null                $pictureOriginalUrl
 * @property string|null                $bio
 * @property bool                       $enabled        {default true}
 * @property bool                       $allowMail      {default false}
 * @property bool                       $allowPublish   {default false}
 * @property \DateTimeImmutable|null    $consens
 * @property string|null                $extended
 * @property \DateTimeImmutable         $created        {default now}
 * @property OneHasMany|Talk[]          $talk           {1:m Talk::$conferee}
 */
class Conferee extends Entity
{

}
