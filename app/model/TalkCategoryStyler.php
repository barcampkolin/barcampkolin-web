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
        $this->keys = $categories;
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
            return 'style-' . $categoryKey;
        }

        return $this->default;
    }

}
