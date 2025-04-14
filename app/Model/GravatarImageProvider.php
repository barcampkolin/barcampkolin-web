<?php

declare(strict_types=1);

namespace App\Model;

class GravatarImageProvider
{
    public function __construct(
        private readonly int $size,
        private readonly string $fallbackUrl,
    )
    {
    }

    public function getGravatarUrl(string $email): string
    {
        $emailHash = md5(strtolower(trim($email)));
        return sprintf(
            'https://www.gravatar.com/avatar/%s?s=%d&d=%s',
            $emailHash,
            $this->size,
            urlencode($this->fallbackUrl)
        );
    }
}
