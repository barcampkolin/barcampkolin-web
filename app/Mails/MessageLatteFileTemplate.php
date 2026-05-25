<?php

namespace App\Mails;

class MessageLatteFileTemplate implements ITemplate
{
    public function __construct(
        private string $filename
    ) {
    }


    public function getFilename(): string
    {
        return $this->filename;
    }


    public function setFilename(string $filename): void
    {
        $this->filename = $filename;
    }
}
