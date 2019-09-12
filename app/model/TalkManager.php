<?php

namespace App\Model;

use App\Orm\Orm;
use App\Orm\Program;
use App\Orm\ProgramRepository;
use App\Orm\Talk;
use App\Orm\TalkRepository;
use App\Orm\TalkVoteRepository;
use InvalidArgumentException;
use Nette\Database\Context;
use Nette\Database\ForeignKeyConstraintViolationException;
use Nette\Database\Table\ActiveRow;
use Nextras\Orm\Collection\ICollection;

class TalkManager
{
    const TABLE_TALK_VOTES_NAME = 'talk_votes';
    const COLUMN_USER_ID = 'user_id';
    const COLUMN_TALK_ID = 'talk_id';

    /** @var TalkRepository $talkRepository */
    private $talkRepository;

    /** @var TalkVoteRepository */
    private $talkVoteRepository;

    /** @var ProgramRepository $talkRepository */
    private $programRepository;

    /** @var Context */
    private $database;

    /** @var EnumeratorManager */
    private $enumerator;


    /**
     * TalkManager constructor.
     * @param Orm $orm
     * @param Context $database
     * @param EnumeratorManager $enumerator
     */
    public function __construct(Orm $orm, Context $database, EnumeratorManager $enumerator)
    {
        $this->talkRepository = $orm->talk;
        $this->talkVoteRepository = $orm->talkVote;
        $this->programRepository = $orm->program;

        $this->database = $database;
        $this->enumerator = $enumerator;
    }


    /**
     * @param Talk $talk
     */
    public function save(Talk $talk)
    {
        $this->talkRepository->persistAndFlush($talk);
    }


    /**
     * @param Talk $talk
     */
    public function remove(Talk $talk)
    {
        $this->talkRepository->removeAndFlush($talk);
    }


    /**
     * @param Program $program
     */
    public function saveProgram(Program $program)
    {
        $this->programRepository->persistAndFlush($program);
    }


    public function removeProgram(Program $program)
    {
        $this->programRepository->removeAndFlush($program);
    }


    /**
     * @return array
     * @throws InvalidEnumeratorSetException
     * @throws \Nette\Utils\JsonException
     */
    public function getCategories()
    {
        return $this->enumerator->getPairs(EnumeratorManager::SET_TALK_CATEGORIES);
    }


    /**
     * @return array
     * @throws InvalidEnumeratorSetException
     * @throws \Nette\Utils\JsonException
     */
    public function getDurations()
    {
        return $this->enumerator->getPairs(EnumeratorManager::SET_TALK_DURATIONS);
    }


    /**
     * @return array
     * @throws InvalidEnumeratorSetException
     * @throws \Nette\Utils\JsonException
     */
    public function getRooms()
    {
        return $this->enumerator->getPairs(EnumeratorManager::SET_TALK_ROOMS);
    }


    /**
     * @param int $userId
     * @return array
     */
    public function getUserVotes($userId)
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
    public function addVote($userId, $talkId)
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
    public function removeVote($userId, $talkId)
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
    public function recountVote($talkId)
    {
        $result = $this->database
            ->query('SELECT SUM(`value`) AS `value` FROM `talk_votes` WHERE `talk_id` = ?', $talkId)
            ->fetch();
        $sum = intval($result['value']);

        /** @var Talk $talk */
        $talk = $this->talkRepository->getById($talkId);
        $talk->votesCount = max(0, $sum + $talk->voteCoefficient);
        $this->talkRepository->persistAndFlush($talk);
    }


    /**
     * @param int $id
     * @return Talk|null
     */
    public function getById($id)
    {
        return $this->talkRepository->getById($id);
    }


    /**
     * @param $id
     * @return Program|null
     */
    public function getProgramById($id)
    {
        return $this->programRepository->getById($id);
    }


    /**
     * @return ICollection
     */
    public function findActive()
    {
        return $this->talkRepository->findBy([
            'enabled' => true
        ]);
    }


    /**
     * @return ICollection
     */
    public function findAll()
    {
        return $this->talkRepository->findAll();
    }


    /**
     * @return ICollection
     */
    public function findAllProgram()
    {
        return $this->programRepository->findAll();
    }


    /**
     * @param int|null $userId
     * @param int|null $talkId
     * @return ICollection
     */
    public function findVotes(?int $userId = null, ?int $talkId = null): ICollection
    {
        $conditionals = [];
        if($userId !== null) {
            $conditionals['user_id'] = $userId;
        }
        if($userId !== null) {
            $conditionals['talk_id'] = $talkId;
        }

        return $this->talkVoteRepository->findBy($conditionals);
    }


    /**
     * @return array
     */
    public function getDurationChoice()
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
    public function getProgramTypes()
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
    public function purgeAll($really = false)
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
    public function purgeAllProgram($really = false)
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
