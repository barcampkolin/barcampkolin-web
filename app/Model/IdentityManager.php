<?php

namespace App\Model;

use App\Orm\Identity\Identity;
use App\Orm\Identity\IdentityRepository;
use App\Orm\Orm;
use Nextras\Orm\Entity\IEntity;


class IdentityManager
{
    private IdentityRepository $identityRepository;


    public function __construct(Orm $orm)
    {
        $this->identityRepository = $orm->identity;
    }


    public function getById(int $id): ?IEntity
    {
        return $this->identityRepository->getById($id);
    }


    /**
     * Get Identity entity from Repository based on anotner Identity entity.
     */
    public function getIdentityByIdentity(Identity $identityTemplate): Identity
    {
        /** @var Identity $identity */
        return $this->getIdentity($identityTemplate->platform, $identityTemplate->key);
    }


    /**
     * @param string $platform Platform name for search
     * @param string $key Identity key for search
     */
    public function getIdentity(string $platform, string $key): Identity
    {
        $identity = $this->identityRepository->getBy([
            'key' => $key,
            'platform' => $platform
        ]);

        if ($identity === null) {
            throw new IdentityNotFoundException('Identity not found');
        }

        return $identity;
    }


    public function save(Identity $identity, bool $withCascade = true): void
    {
        $this->identityRepository->persistAndFlush($identity, $withCascade);
    }


    public function remove(Identity $identity): void
    {
        $this->identityRepository->removeAndFlush($identity);
    }
}
