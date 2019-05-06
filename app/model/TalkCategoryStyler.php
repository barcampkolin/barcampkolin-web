<?php

namespace App\Model;

class TalkCategoryStyler
{
    /**
     * @var array
     */
    private $keys;
    /**
     * @var string
     */
    private $default;


    /**
     * @param array $categories
     * @param string $default
     */
    public function __construct(array $categories, $default = 'style0')
    {
        $this->keys = array_flip(array_keys($categories));
        $this->default = $default;
    }


    /**
     * @param string|null $categoryKey
     * @param string|null $color
     * @return string
     */
    public function getStyleClass($categoryKey, $color = null)
    {
        if ($color !== null) {
            return $color;
        }

        if ($categoryKey !== null && isset($this->keys[$categoryKey])) {
            return 'style' . ($this->keys[$categoryKey] + 1);
        }

        return $this->default;
    }

}
