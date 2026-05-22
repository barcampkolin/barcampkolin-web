<?php

declare(strict_types=1);

namespace App\Model\Entity;

use ArrayAccess;

readonly class EventCounts implements ArrayAccess
{
    use DeprecatedArrayAccess;

    public function __construct(
        public int $conferee,
        public int $conferee_registered,
        public int $conferee_left,
        public int $talks,
        public int $talks_limit,
        public int $workshops,
        public int $halls,
        public int $warmupparty,
        public int $afterparty,
    ) {
    }
}
