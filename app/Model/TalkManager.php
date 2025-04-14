<?php

namespace App\Model;

use App\Orm\Orm;
use App\Orm\Program\Program;
use App\Orm\Program\ProgramRepository;
use App\Orm\Talk\Talk;
use App\Orm\Talk\TalkRepository;
use InvalidArgumentException;
use Nette\Database\Context;
use Nette\Database\ForeignKeyConstraintViolationException;
use Nette\Database\Table\ActiveRow;

class TalkManager
{
    const TABLE_TALK_VOTES_NAME = 'talk_votes';
    const COLUMN_USER_ID = 'user_id';
    const COLUMN_TALK_ID = 'talk_id';

    /** @var \App\Orm\Talk\TalkRepository $talkRepository */
    private $talkRepository;
    /** @var ProgramRepository $talkRepository */
    private $programRepository;


    /**
     * TalkManager constructor.
     * @param Orm $orm
     * @param Context $database
     * @param EnumeratorManager $enumerator
     */
    public function __construct(
        Orm $orm,
        private readonly Context $database,
        private readonly EnumeratorManager $enumerator
    ) {
        $this->talkRepository = $orm->talk;
        $this->programRepository = $orm->program;
    }


    /**
     * @param Talk $talk
     */
    public function save(Talk $talk): void
    {
        $this->talkRepository->persistAndFlush($talk);
    }


    /**
     * @param \App\Orm\Talk\Talk $talk
     */
    public function remove(Talk $talk): void
    {
        $this->talkRepository->removeAndFlush($talk);
    }


    /**
     * @param \App\Orm\Program\Program $program
     */
    public function saveProgram(Program $program): void
    {
        $this->programRepository->persistAndFlush($program);
    }


    public function removeProgram(Program $program): void
    {
        $this->programRepository->removeAndFlush($program);
    }


    /**
     * @return array
     * @throws InvalidEnumeratorSetException
     * @throws \Nette\Utils\JsonException
     */
    public function getCategories(): array
    {
        return $this->enumerator->getPairs(EnumeratorManager::SET_TALK_CATEGORIES);
    }


    /**
     * @return array
     * @throws InvalidEnumeratorSetException
     * @throws \Nette\Utils\JsonException
     */
    public function getDurations(): array
    {
        return $this->enumerator->getPairs(EnumeratorManager::SET_TALK_DURATIONS);
    }


    /**
     * @return array
     * @throws InvalidEnumeratorSetException
     * @throws \Nette\Utils\JsonException
     */
    public function getRooms(): array
    {
        return $this->enumerator->getPairs(EnumeratorManager::SET_TALK_ROOMS);
    }


    /**
     * @param int $userId
     * @return array
     */
    public function getUserVotes($userId): array
    {
        $talkIds = [];
        $res = $this->database->table(self::TABLE_TALK_VOTES_NAME)
            ->where(self::COLUMN_USER_ID, $userId);

        /** @var ActiveRow $row */
        foreach ($res as $row) {
            $talkId = $row->talk_id;
            $talkIds[$talkId] = $talkId;
        }

        return $talkIds;
    }


    /**
     * @param int $userId
     * @param int $talkId
     * @throws ForeignKeyConstraintViolationException
     */
    public function addVote($userId, $talkId): void
    {
        $this->database->table(self::TABLE_TALK_VOTES_NAME)
            ->insert([
                self::COLUMN_USER_ID => (int)$userId,
                self::COLUMN_TALK_ID => (int)$talkId,
            ]);

        $this->recountVote($talkId);
    }


    /**
     * @param int $userId
     * @param int $talkId
     */
    public function removeVote($userId, $talkId): void
    {
        $this->database->table(self::TABLE_TALK_VOTES_NAME)
            ->where([
                self::COLUMN_USER_ID => (int)$userId,
                self::COLUMN_TALK_ID => (int)$talkId,
            ])->delete();

        $this->recountVote($talkId);
    }


    /**
     * @param int $talkId
     */
    public function recountVote($talkId): void
    {
        $result = $this->database
            ->query('SELECT SUM(`value`) AS `value` FROM `talk_votes` WHERE `talk_id` = ?', $talkId)
            ->fetch();
        $sum = intval($result['value']);

        /** @var \App\Orm\Talk\Talk $talk */
        $talk = $this->talkRepository->getById($talkId);
        $talk->votes = max(0, $sum + $talk->voteCoefficient);
        $this->talkRepository->persistAndFlush($talk);
    }


    /**
     * @param int $id
     * @return Talk|null
     */
    public function getById($id): ?\Nextras\Orm\Entity\IEntity
    {
        return $this->talkRepository->getById($id);
    }


    /**
     * @param $id
     * @return Program|null
     */
    public function getProgramById($id): ?\Nextras\Orm\Entity\IEntity
    {
        return $this->programRepository->getById($id);
    }


    /**
     * @return \Nextras\Orm\Collection\ICollection
     */
    public function findActive(): \Nextras\Orm\Collection\ICollection
    {
        return $this->talkRepository->findBy([
            'enabled' => true
        ]);
    }


    /**
     * @return \Nextras\Orm\Collection\ICollection
     */
    public function findAll(): \Nextras\Orm\Collection\ICollection
    {
        return $this->talkRepository->findAll();
    }


    /**
     * @return \Nextras\Orm\Collection\ICollection
     */
    public function findAllProgram(): \Nextras\Orm\Collection\ICollection
    {
        return $this->programRepository->findAll();
    }


    /**
     * @return array
     */
    public function getDurationChoice(): array
    {
        $choice = [];
        foreach (range(5, 120, 5) as $min) {
            $choice[$min] = "$min minut";
        }
        return $choice;
    }


    /**
     * @return array
     */
    public function getProgramTypes(): array
    {
        return [
            'talk' => 'Přednáška',
            'coffee' => 'Coffee break',
            'lunch' => 'Přestávka na oběd',
            'custom' => 'Vlastní blok',
        ];
    }


    /**
     * DANGER remove all
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


    /**
     * DANGER remove all
     * @param bool $really
     * @throws InvalidArgumentException
     */
    public function purgeAllProgram($really = false): void
    {
        if ($really !== true) {
            throw new InvalidArgumentException('Purging all items MUST be confirmed');
        }

        $programItems = $this->findAllProgram();
        foreach ($programItems as $program) {
            $this->removeProgram($program);
        }
    }
}
