<?php

namespace App\Model;

use App\Orm\Conferee\Conferee;
use App\Orm\Conferee\ConfereeRepository;
use App\Orm\Orm;
use InvalidArgumentException;
use JetBrains\PhpStorm\Internal\TentativeType;
use Nextras\Orm\Collection\ICollection;

class ConfereeManager
{
    private readonly ConfereeRepository $confereeRepository;


    public function __construct(Orm $orm)
    {
        $this->confereeRepository = $orm->conferee;
    }


    public function save(Conferee $conferee): void
    {
        $this->confereeRepository->persistAndFlush($conferee);
    }


    public function remove(Conferee $conferee): void
    {
        $this->confereeRepository->removeAndFlush($conferee);
    }


    public function findAll(): ICollection
    {
        return $this->confereeRepository->findAll();
    }



    public function getById($id): ?Conferee
    {
        return $this->confereeRepository->getById($id);
    }


    public function getCount(): int
    {
        return $this->findAll()->countStored();
    }


    public function getActiveCount(): int
    {
        return $this->confereeRepository->findBy(['enabled' => true])->countStored();
    }


    public function purgeAll(bool $really = false): void
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
