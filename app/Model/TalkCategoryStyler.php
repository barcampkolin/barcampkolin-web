<?php

namespace App\Model;

readonly class TalkCategoryStyler
{
    public function __construct(
        private array $keys,
        private string $default = 'style0'
    ) {
    }


    public function getStyleClass(?string $categoryKey, ?string $color = null, ?string $default = null): string
    {
        if ($color !== null) {
            return $color;
        }

        if ($categoryKey !== null && isset($this->keys[$categoryKey])) {
            return 'style-' . $categoryKey;
        }

        if ($default !== null) {
            return $default;
        }

        return $this->default;
    }
}
