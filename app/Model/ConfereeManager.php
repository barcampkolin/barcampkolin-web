<?php

namespace App\Model;

use App\Orm\Conferee\Conferee;
use App\Orm\Conferee\ConfereeRepository;
use App\Orm\Orm;
use InvalidArgumentException;

class ConfereeManager
{
    /**
     * @var ConfereeRepository
     */
    private $confereeRepository;


    /**
     * ConfereeManager constructor.
     * @param Orm $orm
     */
    public function __construct(Orm $orm)
    {
        $this->confereeRepository = $orm->conferee;
    }


    /**
     * @param Conferee $conferee
     */
    public function save(Conferee $conferee): void
    {
        $this->confereeRepository->persistAndFlush($conferee);
    }


    /**
     * @param Conferee $conferee
     */
    public function remove(Conferee $conferee): void
    {
        $this->confereeRepository->removeAndFlush($conferee);
    }


    /**
     * @return \Nextras\Orm\Collection\ICollection
     */
    public function findAll(): \Nextras\Orm\Collection\ICollection
    {
        return $this->confereeRepository->findAll();
    }


    /**
     * @param int $id
     * @return Conferee|null
     */
    public function getById($id): ?\Nextras\Orm\Entity\IEntity
    {
        return $this->confereeRepository->getById($id);
    }


    /**
     * @return int
     */
    public function getCount(): int
    {
        return $this->findAll()->countStored();
    }


    /**
     * @return int
     */
    public function getActiveCount(): int
    {
        return $this->confereeRepository->findBy(['enabled' => true])->countStored();
    }


    /**
     * @param bool $really
     * @throws InvalidArgumentException
     */
    public function purgeAll($really = false): void
    {
        if ($really !== true) {
            throw new InvalidArgumentException('Purging all items MUST be confirmed');
        }

        $talks = $this->findAll();
        foreach ($talks as $talk) {
            $this->remove($talk);
        }
    }
}
