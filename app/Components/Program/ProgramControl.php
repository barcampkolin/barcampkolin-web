<?php

namespace App\Components\Program;

use App\Model\EventInfoProvider;
use App\Model\TalkCategoryStyler;
use App\Model\TalkManager;
use App\Orm\Program\Program;
use Nette\Application\UI\Control;
use Nette\Utils\ArrayHash;
use Tracy\Debugger;
use Tracy\ILogger;

class ProgramControl extends Control
{

    /**
     * ProgramControl constructor.
     * @param EventInfoProvider $infoProvider
     * @param TalkManager $talkManager
     */
    public function __construct(
        private readonly EventInfoProvider $infoProvider,
        private readonly TalkManager $talkManager
    ) {
    }


    /**
     * @throws \Nette\Utils\JsonException
     * @throws \App\Model\InvalidEnumeratorSetException
     * @throws \Exception
     */
    public function render(): void
    {
        $this->template->setFile(__DIR__ . '/Program.latte');

        $this->template->dates = $this->infoProvider->getDates();

        $sortedItems = $this->getSortedItems();
        $minMaxBorder = $this->getMinMaxBorder($sortedItems);

        $this->template->items = $this->getRenderableItems($sortedItems, $minMaxBorder);

        $this->template->timeRows = $this->getTimeRows($minMaxBorder);

        $this->template->rooms = $this->talkManager->getRooms();

        $this->template->counts = $this->infoProvider->getCounts();

        $categories = $this->talkManager->getCategories();
        $this->template->categories = $categories;
        $this->template->styler = new TalkCategoryStyler($categories, 'style1');

        $this->template->render();
    }

    public function getProgramData(): array
    {
        $sortedItems = $this->getSortedItems();

        $talks = [];
        foreach ($sortedItems as $roomId => $roomTalks) {
            /** @var InternalProgramEnvelope $talk */
            foreach ($roomTalks as $id => $talk) {
                $talks [] = [
                    'id' => $id,
                    'room' => $roomId,
                    'title' => $talk->getTitle(),
                    'speaker' => $talk->getSpeaker(),
                    'start' => $this->formatClock($talk->getTime()),
                    'end' => $this->formatClock($this->addIntervalDuration($talk->getTime(), $talk->getDuration())),
                    'duration' => $talk->getDuration(),
                    'category' => $talk->getCategory(),
                    'style' => $talk->getStyle(),
                    'class'=> $talk->getStyle() ?? ($talk->getCategory() ? lcfirst(str_replace('-', '', ucwords($talk->getCategory(), '-'))) : 'none'),
                ];
            }
        }

        $pattern = array_fill_keys(array_keys($sortedItems), null);
        unset($sortedItems);

        $times = [];

        foreach ($talks as $talk) {
            $time = $talk['start'];
            if (!isset($times[$time])) {
                $times[$time] = $pattern;
            }
            $times[$time][$talk['room']] = $talk;
        }

        ksort($times);

        // Zjištění přetoků

        // Projdeme každou místnost
        foreach ($pattern as $roomId => $_) {
            unset($lastTalk);

            // Projdeme všechny časy v místnosti
            foreach ($times as $time => $rooms) {
                // Pokud máme uloženou poslední přednášku v místnosti, podíváme se, zda nepřetéká do dalšího časového bodu
                if (isset($lastTalk) && ($lastTalk['end'] > $time)) {

                    // Kontrola chyby v programu
                    if ($rooms[$roomId] !== null) {
                        throw new \Exception(
                            sprintf(
                                'Přednáška "%s" v místnosti "%s" se překrývá s předchozí přednáškou "%s".',
                                $rooms[$roomId]['title'],
                                $roomId,
                                $lastTalk['title']
                            )
                        );
                    }

                    // Pokud ano, přidáme do přetekající přednáčky příznak přetékání - pokud už je, inkrementujeme ho
                    // bude použito pro rowspan v tabulce
                    $lastTalk['overflow'] = ($lastTalk['overflow'] ?? 1) + 1;
                    // A nálsedující čas v mástnost $roomId nastavíme na -1, což znamená, že se nemá vykreslit prázdná <td>
                    // $times[$time] nelze nazhradit za $rooms - potřebujeme upravit původní pole $times
                    /** @noinspection PhpArrayAccessCanBeReplacedWithForeachValueInspection */
                    $times[$time][$roomId] = -1;
                } else {
                    // Pokud pokud přenáčka nepřetéká, tak ji dále nesledujeme
                    unset($lastTalk);
                }

                // Kokuj je v aktuální mísntosti přednáška, tak ji uložíme jako poslední, abysme následně mohli kontrolovat přetékání
                if (is_array($rooms[$roomId])) {
                    // $times[$time] nelze nazhradit za $rooms - potřebujeme upravit původní pole $times
                    /** @noinspection PhpArrayAccessCanBeReplacedWithForeachValueInspection */
                    $lastTalk = &$times[$time][$roomId];
                }
            }
        }

        $rooms = $this->talkManager->getRooms();

        return [
            'times'=>$times,
            'rooms' => $rooms,
        ];
    }


    /**
     * @return array
     */
    private function getSortedItems(): array
    {
        $program = $this->talkManager->findAllProgram();

        $rooms = [];

        /** @var Program $programItem */
        foreach ($program as $programItem) {
            if (!isset($rooms[$programItem->room])) {
                $rooms[$programItem->room] = [];
            }

            $minutes = $this->dateIntervalToMinutes($programItem->time);
            $internalProgramEnvelope = new InternalProgramEnvelope($programItem);
            $internalProgramEnvelope->setDefaultTitle($this->talkManager->getProgramTypes()[$programItem->type]);

            $rooms[$programItem->room][$minutes] = $internalProgramEnvelope;
        }

        foreach ($rooms as $key => $cat) {
            ksort($rooms[$key]);
        }

        return $rooms;
    }


    /**
     * Get min-max minute mantilels of all exists program items.
     * For spped is using array key (that represent minutes delay of item begin from midnight).
     * @param array $sortedItems
     * @param bool $roundWholeHour
     * @return ArrayHash
     * @throws \Exception
     */
    private function getMinMaxBorder(array $sortedItems, $roundWholeHour = true)
    {
        $max = $min = null;

        foreach ($sortedItems as $room) {
            $min = is_null($min) ? min(array_keys($room)) : min(array_merge([$min], array_keys($room)));


            /** @var InternalProgramEnvelope $maxItem */
            $maxKey = max(array_keys($room));
            $maxItem = $room[$maxKey];
            $maxItemValue = $maxItem->getDuration() + $maxKey;
            $max = is_null($max) ? $maxItemValue : max($max, $maxItemValue);
        }

        if ($roundWholeHour) {
            $min -= $min % 60;
            $max = $max + 60 - (($max % 60) ?: 60);
        }

        return ArrayHash::from([
            'min' => $this->minutesToDateInterval($min),
            'max' => $this->minutesToDateInterval($max),
        ]);
    }


    /**
     * @param array $sortedItems
     * @param ArrayHash $minMaxBorder
     * @return array
     * @throws \Exception
     */
    private function getRenderableItems(array $sortedItems, ArrayHash $minMaxBorder): array
    {
        $renderableItems = [];
        foreach ($sortedItems as $roomKey => $roomItems) {
            $renderableItems[$roomKey] = [];
            $items = [];
            $prevEnd = $minMaxBorder->min;

            /** @var InternalProgramEnvelope $program */
            foreach ($roomItems as $program) {
                $spaceMinutes = $program->computePreviousSpaceMinutes($prevEnd);

                if ($spaceMinutes < 0) {
                    Debugger::log(
                        sprintf(
                            'Talk "%s" nelze vykreslit, překrývá se s jiným (nebo je před začátkem)',
                            $program->title
                        ),
                        ILogger::WARNING
                    );
                    continue;
                }

                if ($spaceMinutes > 0) {
                    while ($spaceMinutes) {
                        $items[] = $spacer = $this->getSpacer($prevEnd, min($spaceMinutes, 60));
                        $prevEnd = $spacer->getEndTime();
                        $spaceMinutes = $program->computePreviousSpaceMinutes($prevEnd);
                    }
                }

                $items[] = $program;
                $prevEnd = $program->getEndTime();
            }
            $renderableItems[$roomKey] = $items;
        }

        return $renderableItems;
    }


    /**
     * @return mixed[]
     */
    private function getTimeRows(ArrayHash $minMaxBorder): array
    {
        $rows = [];

        $time = new \DateInterval('PT0H');
        $time->h = $minMaxBorder->min->h;
        $time->i = $minMaxBorder->min->i;

        do {
            $rows[] = $this->formatClock($time);
            $time->h++;
        } while ($minMaxBorder->max->h >= $time->h);

        return $rows;
    }


    /**
     * @param \DateInterval $start
     * @param int $minutes
     * @return InternalProgramVirtual
     */
    private function getSpacer(\DateInterval $start, float|int $minutes): \App\Components\Program\InternalProgramVirtual
    {
        return new InternalProgramVirtual('space', $start, $minutes);
    }


    /**
     * @param \DateInterval $dateInterval
     * @return int
     */
    private function dateIntervalToMinutes(\DateInterval $dateInterval): int|float
    {
        $hours = intval($dateInterval->h);

        $minutes = intval($dateInterval->i);

        $minutes += max(0, $hours) * 60;

        return $minutes;
    }


    /**
     * @param int $minutes
     * @return \DateInterval
     * @throws \Exception
     */
    private function minutesToDateInterval($minutes): \DateInterval
    {
        $dateInterval = new \DateInterval('PT0H');
        $h = 0;
        $i = $minutes;

        while ($i >= 60) {
            $i -= 60;
            $h++;
        }

        $dateInterval->i = $i;
        $dateInterval->h = $h;
        return $dateInterval;
    }


    private function formatClock(\DateInterval $dateInterval): string
    {
        return $dateInterval->format('%H:%I');
    }

    private function addIntervalDuration(\DateInterval $dateInterval, int $duration): \DateInterval
    {
        $dateInterval = clone $dateInterval;

        $dateInterval->i += $duration;

        while ($dateInterval->i >= 60) {
            $dateInterval->i -= 60;
            $dateInterval->h++;
        }

        return $dateInterval;
    }
}
