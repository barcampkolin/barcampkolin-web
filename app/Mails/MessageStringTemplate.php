<?php

namespace App\Mails;

class MessageStringTemplate implements ITemplate
{
    public function __construct(
        private $content
    ) {
    }


    public function getContent(): string
    {
        return $this->content;
    }


    public function setContent(string $content): void
    {
        $this->content = $content;
    }
}
