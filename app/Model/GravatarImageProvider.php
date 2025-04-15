<?php

declare(strict_types=1);

namespace App\Model;

class GravatarImageProvider
{
    private string $fallbackUrl;

    public function __construct(
        private readonly int $size,
        string $fallbackUrl,
        EventInfoProvider $infoProvider
    )
    {
        $year = $infoProvider->getDates()->year;
        $this->fallbackUrl = strtr($fallbackUrl, ['{year}' => $year]);
    }

    /**
     * Returns the Gravatar URL if `$url` is null, otherwise returns `$url`.
     */
    public function gravatarize(?string $url, string $email): string
    {
        return $url ?? $this->getGravatarUrl($email);
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
