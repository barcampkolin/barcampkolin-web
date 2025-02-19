<?php

namespace App\Model;

class TalkCategoryStyler
{
    /**
     * @param array $keys
     * @param string $default
     */
    public function __construct(private array $keys, private $default = 'style0')
    {
    }


    /**
     * @param string|null $categoryKey
     * @param string|null $color
     * @param string|null $default
     * @return string
     */
    public function getStyleClass($categoryKey, $color = null, $default = null)
    {
        if ($color !== null) {
            return $color;
        }

        if ($categoryKey !== null && isset($this->keys[$categoryKey])) {
            return 'style-' . $categoryKey;
        }

        if($default !== null) {
            return $default;
        }

        return $this->default;
    }

}
