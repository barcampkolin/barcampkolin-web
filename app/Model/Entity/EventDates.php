<?php

declare(strict_types=1);

namespace App\Model\Entity;

use DateTimeInterface;

readonly class EventDates implements \ArrayAccess, \JsonSerializable
{
    use DeprecatedArrayAccess;

    public function __construct(
        public int $year,
        public DateTimeInterface $talks,
        public DateTimeInterface $vote,
        public DateTimeInterface $program,
        public DateTimeInterface $event,
        public DateTimeInterface $report,
        public DateTimeInterface $scheduleBegin,
        public DateTimeInterface $scheduleEnd,
    ) {
    }

    public function jsonSerialize(): array
    {
        $data = get_object_vars($this);

        $data = array_map(function ($value) {
            if ($value instanceof DateTimeInterface) {
                return $value->format(DateTimeInterface::ATOM);
            }
            return $value;
        }, $data);

        return $data;
    }
}
