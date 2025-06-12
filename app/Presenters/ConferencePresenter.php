<?php

namespace App\Presenters;

use App\Components\Program\IProgramControlFactory;
use App\Model\EventInfoProvider;
use App\Model\TalkManager;
use App\Orm\Orm;
use App\Orm\Program\Program;
use App\Orm\Talk\Talk;
use App\Orm\Talk\TalkRepository;
use DateTimeImmutable;
use DateTimeZone;
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
        $this->template->allowTalkEdit = $this->eventInfoProvider->getFeatures()['talks_edit'];
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
            $program = $talk->program->getIterator()->fetch();

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

    public function renderTvProgram(?int $roomId = null, ?int $offset = 20, ?string $now = null): void
    {
        $program = $this['program']->getProgramData();

        $rooms = array_keys($program['rooms']);

        $tz = new DateTimeZone('Europe/Prague');

        $nowDt = new DateTimeImmutable('now', $tz);
        if($now && preg_match('~^(?<hour>\d{1,2}):?(?<minute>\d{2})$~', $now, $matches)) {
            $nowDt = $nowDt->setTime($matches['hour'], $matches['minute']);
        }elseif ($now) {
            $this->error('Invalid time format, expected HH:MM');
        }

        $nowOffset = $nowDt->modify("+ {$offset} minutes")->format('H:i');
        $now = $nowDt->format('H:i');

        if ($roomId !== null) {
            $currentRoom = $rooms[$roomId - 1] ?? null;
            if (!$currentRoom) {
                $this->error('Room not found');
            }
        }

        // Zachytím si poslední přednášky před aktuálním časem - důležité při případ, že aktuálně bude běžět přednáška,
        // která "přetéká" do dalšího času
        $currentTime = array_key_first($program['times']);
        $lastTalks = array_fill_keys($rooms, null);
        foreach ($program['times'] as $time => $rooms) {
            if ($time <= $nowOffset) {
                $currentTime = $time;
                foreach ($rooms as $room => $talk) {
                    if (is_array($talk)) {
                        $lastTalks[$room] = $talk;
                    }
                }
            }
        }

        // Odstraním časy, které jsou menší než aktuální časový slot
        foreach ($program['times'] as $time => $rooms) {
            if ($time < $currentTime) {
                unset($program['times'][$time]);
            } else {
                break;
            }
        }

        // Zkontroluju, jestli v aktuální časovém slotu není přednáška, která "přetéká" z dřívějšího slotu a případně ji přidám
        foreach ($program['times'][$currentTime] as $room => $talks) {
            if ($talks === -1) {
                $lastTalks[$room]['overflow'] = 1; //ugly hack - měla by se spočítat správná hodnota - // Fixme
                $program['times'][$currentTime][$room] = $lastTalks[$room];
            }
        }

        // todo - melo by se doplnit, pokud je v aktuálním slotu přednáška, která ale fakticky skončila a je pauza, aby
        // se odstranila - ale pak je třeba řešit i odsranění slotu, pokud už v něm žádná přendáška nezbyla.

        $this->template->rooms = $program['rooms'];
        $this->template->times = $program['times'];
        $this->template->currentRoom = $currentRoom ?? null;

        if (isset($currentRoom)) {
            foreach ($program['times'] as $time => $rooms) {
                $talk = $rooms[$currentRoom];

                // Pokud je zvolený čas větší naž aktuální čas a je v něm přednáška, vypiš ji jako následující
                if ($time > $now && is_array($talk)) {
                    $this->template->currentTalk = $talk;
                    $this->template->currentTalkFuture = true;
                    break;
                }

                // Pokud je ve zvoleném čase platná přednáška a její konec je v budoucnu, vypiš ji jako aktuální
                if (is_array($talk) && $talk['end'] >= $now) {
                    $this->template->currentTalk = $talk;
                    $this->template->currentTalkFuture = false;
                    break;
                }
            }
        }


        $this->getHttpResponse()->setExpiration(0);
        //$this->sendJson($program);
    }


    public function embedizeYouTube($url, $campainId = null)
    {
        $matches = null;
        if (preg_match('~youtu\\.?be(?:\\.com)?/(?:watch\\?v=)?([-_a-z0-9]{8,15})~i', (string)$url, $matches)) {
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
        return $url . (str_contains((string)$url, '?') ? '&' : '?') . $postfix;
    }


    /**
     * @return \App\Components\Program\ProgramControl
     */
    public function createComponentProgram()
    {
        return $this->programFactory->create();
    }
}
