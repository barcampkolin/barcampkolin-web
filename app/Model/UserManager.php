<?php

namespace App\Model;

use App\Orm\Identity\IdentityRepository;
use App\Orm\Orm;
use App\Orm\User\User;
use App\Orm\User\UserRepository;
use App\Orm\UserRole\UserRole;
use App\Orm\UserRole\UserRoleRepository;

class UserManager
{
    private readonly UserRepository $userRepository;
    private readonly IdentityRepository $identityRepository;
    private readonly UserRoleRepository $userRoleRepository;


    public function __construct(Orm $orm)
    {
        $this->userRepository = $orm->user;
        $this->identityRepository = $orm->identity;
        $this->userRoleRepository = $orm->role;
    }


    public function getById(int $id): ?User
    {
        return $this->userRepository->getById($id);
    }


    public function save(User $user): void
    {
        $this->userRepository->persistAndFlush($user);
    }


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
