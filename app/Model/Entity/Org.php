<?php

declare(strict_types=1);

namespace App\Model\Entity;

readonly class Org
{
    public function __construct(
        public string $name,
        public ?string $role,
        public ?string $photo,
        public ?string $phone,
        public ?string $mail,
        public ?string $homepage,
        public ?string $facebook,
        public ?string $twitter,
    ) {
    }

    public static function from(array $array): self
    {
        return new self(
            $array['name'],
            $array['role'] ?? null,
            $array['photo'] ?? null,
            $array['phone'] ?? null,
            $array['mail'] ?? null,
            $array['homepage'] ?? null,
            $array['facebook'] ?? null,
            $array['twitter'] ?? null,
        );
    }
}
