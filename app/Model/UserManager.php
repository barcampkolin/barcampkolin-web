<?php

namespace App\Model;

use App\Orm\Identity\IdentityRepository;
use App\Orm\Orm;
use App\Orm\User\User;
use App\Orm\User\UserRepository;
use App\Orm\UserRole\UserRole;
use App\Orm\UserRole\UserRoleRepository;
use Nextras\Orm\Entity\IEntity;

class UserManager
{
    private UserRepository $userRepository;
    private IdentityRepository $identityRepository;
    private UserRoleRepository $userRoleRepository;


    public function __construct(Orm $orm)
    {
        $this->userRepository = $orm->user;
        $this->identityRepository = $orm->identity;
        $this->userRoleRepository = $orm->role;
    }


    /**
     * @param $id
     * @return User|null
     */
    public function getById($id): ?IEntity
    {
        return $this->userRepository->getById($id);
    }


    /**
     * @param User $user
     */
    public function save(User $user): void
    {
        $this->userRepository->persistAndFlush($user);
    }


    /**
     * @param User $user
     */
    public function remove(User $user): void
    {
        $this->userRepository->removeAndFlush($user);
    }


    public function removeRole(UserRole $role): void
    {
        $this->userRoleRepository->removeAndFlush($role);
    }


    public function getByLoginUser(\Nette\Security\User $currentUser): User
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
