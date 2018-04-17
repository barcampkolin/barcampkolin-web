<?php

namespace App\Mails;

class MessageLatteTemplate implements ITemplate
{
    /**
     * @var string
     */
    private $filename;


    /**
     * MessageLatteTemplate constructor.
     * @param string $filename
     */
    public function __construct($filename)
    {

        $this->filename = $filename;
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
    public function setFilename($filename)
    {
        $this->filename = $filename;
    }
}
