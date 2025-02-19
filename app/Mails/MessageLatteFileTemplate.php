<?php

namespace App\Mails;

class MessageLatteFileTemplate implements ITemplate
{
    /**
     * MessageLatteFileTemplate constructor.
     * @param string $filename
     */
    public function __construct(private $filename)
    {
    }


    /**
     * @return string
     */
    public function getFilename()
    {
        return $this->filename;
    }


    /**
     * @param string $filename
     */
    public function setFilename($filename): void
    {
        $this->filename = $filename;
    }
}
