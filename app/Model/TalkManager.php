<?php

namespace App\Model;

use App\Orm\Orm;
use App\Orm\Program\Program;
use App\Orm\Program\ProgramRepository;
use App\Orm\Talk\Talk;
use App\Orm\Talk\TalkRepository;
use InvalidArgumentException;
use Nette\Database\Explorer;
use Nette\Database\Table\ActiveRow;
use Nextras\Orm\Collection\ICollection;

class TalkManager
{
    private const string TABLE_TALK_VOTES_NAME = 'talk_votes';
    private const string COLUMN_USER_ID = 'user_id';
    private const string COLUMN_TALK_ID = 'talk_id';

    private TalkRepository $talkRepository;
    private ProgramRepository $programRepository;


    public function __construct(
        Orm $orm,
        private readonly Explorer $database,
        private readonly EnumeratorManager $enumerator
    ) {
        $this->talkRepository = $orm->talk;
        $this->programRepository = $orm->program;
    }


    public function save(Talk $talk): void
    {
        $this->talkRepository->persistAndFlush($talk);
    }


    public function remove(Talk $talk): void
    {
        $this->talkRepository->removeAndFlush($talk);
    }


    public function saveProgram(Program $program): void
    {
        $this->programRepository->persistAndFlush($program);
    }


    public function removeProgram(Program $program): void
    {
        $this->programRepository->removeAndFlush($program);
    }


    public function getCategories(): array
    {
        return $this->enumerator->getPairs(EnumeratorManager::SET_TALK_CATEGORIES);
    }


    public function getDurations(): array
    {
        return $this->enumerator->getPairs(EnumeratorManager::SET_TALK_DURATIONS);
    }


    public function getRooms(): array
    {
        return $this->enumerator->getPairs(EnumeratorManager::SET_TALK_ROOMS);
    }


    public function getUserVotes(int $userId): array
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


    public function addVote(int $userId, int $talkId): void
    {
        $this->database->table(self::TABLE_TALK_VOTES_NAME)
            ->insert([
                self::COLUMN_USER_ID => (int)$userId,
                self::COLUMN_TALK_ID => (int)$talkId,
            ]);

        $this->recountVote($talkId);
    }


    public function removeVote(int $userId, int $talkId): void
    {
        $this->database->table(self::TABLE_TALK_VOTES_NAME)
            ->where([
                self::COLUMN_USER_ID => (int)$userId,
                self::COLUMN_TALK_ID => (int)$talkId,
            ])->delete();

        $this->recountVote($talkId);
    }


    public function recountVote(int $talkId): void
    {
        $result = $this->database
            ->query('SELECT SUM(`value`) AS `value` FROM `talk_votes` WHERE `talk_id` = ?', $talkId)
            ->fetch();
        $sum = intval($result['value']);

        /** @var Talk $talk */
        $talk = $this->talkRepository->getById($talkId);
        $talk->votes = max(0, $sum + $talk->voteCoefficient);
        $this->talkRepository->persistAndFlush($talk);
    }


    public function getById(int $id): ?Talk
    {
        return $this->talkRepository->getById($id);
    }


    public function getProgramById(int $id): ?Program
    {
        return $this->programRepository->getById($id);
    }


    public function findActive(): ICollection
    {
        return $this->talkRepository->findBy([
            'enabled' => true
        ]);
    }


    public function findAll(): ICollection
    {
        return $this->talkRepository->findAll();
    }


    public function findAllProgram(): ICollection
    {
        return $this->programRepository->findAll();
    }


    public function getDurationChoice(): array
    {
        $choice = [];
        foreach (range(5, 120, 5) as $min) {
            $choice[$min] = "$min minut";
        }
        return $choice;
    }


    public function getProgramTypes(): array
    {
        return [
            'talk' => 'Přednáška',
            'coffee' => 'Coffee break',
            'lunch' => 'Přestávka na oběd',
            'custom' => 'Vlastní blok',
        ];
    }


    /** DANGER remove all */
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


    /** DANGER remove all */
    public function purgeAllProgram(bool $really = false): void
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
