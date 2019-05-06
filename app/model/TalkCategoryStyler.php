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
