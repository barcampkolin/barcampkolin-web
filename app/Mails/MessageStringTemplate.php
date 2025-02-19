<?php

namespace App\Mails;

class MessageStringTemplate implements ITemplate
{
    /**
     * MessageStringTemplate constructor.
     * @param string $content
     */
    public function __construct(private $content)
    {
    }


    /**
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }


    /**
     * @param string $content
     */
    public function setContent($content): void
    {
        $this->content = $content;
    }
}
