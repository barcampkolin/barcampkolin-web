<?php

declare(strict_types=1);

namespace App\Model\Entity;

use ArrayAccess;

readonly class EventUrls implements ArrayAccess
{
    use DeprecatedArrayAccess;

    public function __construct(
        public string $facebook,
        public string $twitter,
        public string $youtube,
        public string $instagram,
        public string $way,
        public string $ogImage,
        public string $partnerProposal,
    ) {
    }
}
