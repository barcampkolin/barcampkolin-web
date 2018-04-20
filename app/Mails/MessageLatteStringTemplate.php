<?php

namespace App\Mails;

class MessageLatteStringTemplate implements ITemplate
{
    /**
     * @var array
     */
    private $templates;


    /**
     * MessageLatteFileTemplate constructor.
     * @param array $templates
     */
    public function __construct(array $templates)
    {
        $this->templates = $templates;
    }


    /**
     * @return array
     */
    public function getTemplates()
    {
        return $this->templates;
    }


    /**
     * @param array $templates
     */
    public function setTemplates($templates)
    {
        $this->templates = $templates;
    }
}
