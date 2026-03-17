<?php

declare(strict_types=1);

namespace App\Model\Entity;

use ArrayAccess;

readonly class EventFeatures implements ArrayAccess
{
    use DeprecatedArrayAccess;

    public function __construct(
        public bool $conferee,
        public bool $conferee_enabled,
        public bool $talks,
        public bool $talks_edit,
        public string $talks_order,
        public bool $vote,
        public bool $show_vote,
        public bool $program,
        public bool $report,
        public bool $talks_show,
    ) {
    }
}
