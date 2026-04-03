<?php

declare(strict_types=1);

namespace App\Model;

use DateTimeImmutable;
use DateTimeInterface;
use DateTimeZone;

class DateProvider
{
    public function __construct(
        public readonly DateTimeZone $zone
    ) {
    }

    public function now(): DateTimeImmutable
    {
        return new DateTimeImmutable('now', $this->zone);
    }

    public function today(): DateTimeImmutable
    {
        return new DateTimeImmutable('today midnight', $this->zone);
    }

    public function strToDate(string $dateString): DateTimeImmutable
    {
        return new DateTimeImmutable($dateString, $this->zone);
    }

    public function isPassed(DateTimeInterface $date, bool $byMidnight = false): bool
    {
        return $date <= ($byMidnight ? $this->today() : $this->now());
    }

    public function isFuture(DateTimeInterface $date, bool $byMidnight = false): bool
    {
        return !$this->isPassed($date, $byMidnight);
    }

    public function getZone(): DateTimeZone
    {
        return $this->zone;
    }
}
