<?php

namespace App\Model;

use App\Orm\Identity\IdentityRepository;
use App\Orm\Orm;
use App\Orm\User\User;
use App\Orm\User\UserRepository;
use App\Orm\UserRole\UserRole;

/**
 * Users management.
 */
class UserManager
{
    /** @var \App\Orm\User\UserRepository */
    private $userRepository;

    /** @var \App\Orm\Identity\IdentityRepository */
    private $identityRepository;

    /** @var \App\Orm\UserRole\UserRoleRepository */
    private $userRoleRepository;


    /**
     * UserManager constructor.
     * @param Orm $orm
     */
    public function __construct(Orm $orm)
    {
        $this->userRepository = $orm->user;
        $this->identityRepository = $orm->identity;
        $this->userRoleRepository = $orm->role;
    }


    /**
     * @param $id
     * @return \App\Orm\User\User|null
     */
    public function getById($id): ?\Nextras\Orm\Entity\IEntity
    {
        return $this->userRepository->getById($id);
    }


    /**
     * @param \App\Orm\User\User $user
     */
    public function save(User $user): void
    {
        $this->userRepository->persistAndFlush($user);
    }


    /**
     * @param \App\Orm\User\User $user
     */
    public function remove(User $user): void
    {
        $this->userRepository->removeAndFlush($user);
    }

    public function removeRole(UserRole $role): void
    {
        $this->userRoleRepository->removeAndFlush($role);
    }


    /**
     * @param \Nette\Security\User $currentUser
     * @return \App\Orm\User\User
     * @throws NoUserLoggedIn
     * @throws UserNotFound
     */
    public function getByLoginUser(\Nette\Security\User $currentUser)
    {
        if ($currentUser->isLoggedIn() === false) {
            throw new NoUserLoggedIn();
        }

        $user = $this->getById($currentUser->id);

        if ($user === null) {
            throw new UserNotFound();
        }

        return $user;
    }


}
