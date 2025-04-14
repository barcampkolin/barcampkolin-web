<?php

namespace App\Presenters;

use App\Components\Program\IProgramControlFactory;
use App\Model\EventInfoProvider;
use App\Model\TalkManager;
use App\Orm\Orm;
use App\Orm\Program\Program;
use App\Orm\Talk\Talk;
use App\Orm\Talk\TalkRepository;
use Nette\Utils\Json;
use Nextras\Orm\Collection\ICollection;

class ConferencePresenter extends BasePresenter
{
    /** @var TalkRepository $talkRepository */
    private $talkRepository;


    /**
     * ConferencePresenter constructor.
     * @param Orm $orm
     * @param TalkManager $talkManager
     * @param EventInfoProvider $eventInfoProvider
     * @param IProgramControlFactory $programFactory
     */
    public function __construct(
        Orm $orm,
        private readonly TalkManager $talkManager,
        private readonly EventInfoProvider $eventInfoProvider,
        private readonly IProgramControlFactory $programFactory
    ) {
        parent::__construct();
        $this->talkRepository = $orm->talk;
    }


    /**
     * @throws \App\Model\InvalidEnumeratorSetException
     * @throws \Nette\Utils\JsonException
     */
    public function renderTalks(): void
    {
        /** @var ICollection|Talk[] $talks */
        $talks = $this->talkRepository->findBy(
            ['enabled' => true]
        );
        $categories = $this->talkManager->getCategories();

        $sort = $this->eventInfoProvider->getFeatures()['talks_order'];
        if ($sort === 'random') {
            $talks = $talks->fetchAll();
            shuffle($talks);
        } elseif ($sort === 'vote') {
            $talks = $talks->orderBy('votes', ICollection::DESC);
        }

        $filtered = [];
        foreach ($talks as $talk) {
            if ($talk->conferee === null) {
                continue;
            }

            $extended = [];

            if ($talk->extended) {
                $extended = Json::decode($talk->extended, Json::FORCE_ARRAY);
            }

            $filtered[] = [
                'talk' => $talk,
                'extended' => $extended,
                'category' => $categories[$talk->category] ?? null,
            ];
        }
        $this->template->talksInfo = $filtered;
        $this->template->count = count($filtered);

        $votes = [];

        if ($this->user->isLoggedIn()) {
            $votes = $this->talkManager->getUserVotes($this->user->id);
        }

        $this->template->votes = $votes;
        $this->template->allowVote = $this->eventInfoProvider->getFeatures()['vote'];
        $this->template->selectedLimit = false;

        $talks_limit = $this->eventInfoProvider->getCounts()['talks_limit'];

        if ($sort === 'vote' && $talks_limit > 0) {
            $this->template->selectedLimit = $talks_limit;
        }
    }


    /**
     * @secured
     * @param int $talkId
     * @throws \Nette\Application\AbortException
     */
    public function handleVote($talkId): void
    {
        $userId = $this->user->id;
        $this->talkManager->addVote($userId, $talkId);
        if ($this->isAjax()) {
            $talk = $this->talkManager->getById($talkId);
            $this->sendJson([
                'votes' => $talk->votes,
                'hasVoted' => true,
            ]);
        }
        $this->redirect('this');
    }


    /**
     * @secured
     * @param int $talkId
     * @throws \Nette\Application\AbortException
     */
    public function handleUnvote($talkId): void
    {
        $userId = $this->user->id;
        $this->talkManager->removeVote($userId, $talkId);
        if ($this->isAjax()) {
            $talk = $this->talkManager->getById($talkId);
            $this->sendJson([
                'votes' => $talk->votes,
                'hasVoted' => false,
            ]);
        }

        $this->redirect('this');
    }


    /**
     * @throws \Nette\Application\AbortException
     */
    public function handleSignToVote(): void
    {
        if ($this->user->isLoggedIn()) {
            $this->redirect('this');
        } else {
            $this->redirect('Sign:in', [
                'backlink' => $this->storeRequest()
            ]);
        }
    }


    /**
     * @param $id
     * @throws \Nette\Application\BadRequestException
     * @throws \Nette\Utils\JsonException
     */
    public function renderTalkDetail($id): void
    {
        if (!intval($id)) {
            $this->error('Není vyplněno ID přednášky');
        }

        $talk = $this->talkManager->getById($id);

        if (!$talk) {
            $this->error('Přednáška nenalezena');
        }

        $extended = Json::decode($talk->extended, Json::FORCE_ARRAY);

        $this->template->talk = $talk;
        $this->template->extended = $extended;
        $this->template->ogImageUrl = $extended['ogImageUrl'] ?? null;

        $features = $this->eventInfoProvider->getFeatures();
        $this->template->allowVote = $features['vote'];
        $this->template->showReport = $features['report'];

        $this->template->program = null;
        if ($features['program'] && $talk->program->countStored()) {
            /** @var Program $program */
            $program = $talk->program->get()->fetch();

            $this->template->program = [
                'time' => $program->time->format('%H:%I'),
                'room' => $this->talkManager->getRooms()[$program->room],
            ];
        }

        $votes = [];

        if ($this->user->isLoggedIn()) {
            $votes = $this->talkManager->getUserVotes($this->user->id);
        }

        $this->template->votes = $votes;

        $this->template->addFilter('embedizeYouTube', $this->embedizeYouTube(...));
        $this->template->addFilter('campainizeYouTube', $this->campainizeYouTube(...));
    }


    public function embedizeYouTube($url, $campainId = null)
    {
        $matches = null;
        if (preg_match('~youtu\\.?be(?:\\.com)?/(?:watch\\?v=)?([-_a-z0-9]{8,15})~i', (string) $url, $matches)) {
            return $this->buildCampainUrl(
                "https://www.youtube.com/embed/$matches[1]",
                'yt-video-embed',
                $campainId
            );
        }
    }


    public function campainizeYouTube(string $url, $campainId = null): string
    {
        return $this->buildCampainUrl(
            $url,
            'yt-video-youtube',
            $campainId
        );
    }


    private function buildCampainUrl(string $url, string $medium, $campainId): string
    {
        $postfix = "utm_source=pbc-web&utm_medium=$medium&utm_content=$campainId&utm_campaign=talk-detail";
        return $url . (str_contains((string) $url, '?') ? '&' : '?') . $postfix;
    }


    /**
     * @return \App\Components\Program\ProgramControl
     */
    public function createComponentProgram()
    {
        return $this->programFactory->create();
    }
}
