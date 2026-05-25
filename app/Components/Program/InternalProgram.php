<?php

namespace App\Components\Program;

use DateInterval;
use Nette\SmartObject;

/**
 * @property-read int $talkId
 * @property-read string $title
 * @property-read string $speaker
 * @property-read DateInterval $time
 * @property-read string $startClock
 * @property-read string $endClock
 * @property-read string $type
 * @property-read int $duration
 * @property-read string $style
 */
abstract class InternalProgram implements IInternalProgram
{
    use SmartObject;


    abstract public function getTalkId(): ?int;


    abstract public function getTitle(): string;


    abstract public function isTitleOverridden(): bool;


    abstract public function getSpeaker(): ?string;


    abstract public function getType(): string;


    abstract public function getTime(): DateInterval;


    abstract public function getDuration(): int;


    abstract public function getStyle(): ?string;


    public function getEndTime(): DateInterval
    {
        $start = $this->getTime();
        $end = new DateInterval('PT0H');
        $h = $start->h;
        $i = $start->i + $this->getDuration();

        while ($i >= 60) {
            $i -= 60;
            $h++;
        }

        $end->i = $i;
        $end->h = $h;
        return $end;
    }


    public function getStartClock(): string
    {
        return $this->getTime()->format('%H:%I');
    }


    public function getEndClock(): string
    {
        return $this->getEndTime()->format('%H:%I');
    }


    public function computePreviousSpaceMinutes(DateInterval $previousEnd): float|int
    {
        $start = $this->getTime();

        $space = ($start->h - $previousEnd->h) * 60;
        $space += $start->i - $previousEnd->i;

        return $space;
    }
}
