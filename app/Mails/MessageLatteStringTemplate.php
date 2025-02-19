<?php

namespace App\Mails;

class MessageLatteStringTemplate implements ITemplate
{
    /**
     * MessageLatteFileTemplate constructor.
     * @param array $templates
     */
    public function __construct(private array $templates = [])
    {
    }


    /**
     * @param string $key
     * @param string $template
     */
    public function addTemplate($key, $template): void
    {
        $this->templates[$key] = $template;
    }


    /**
     * @param string $template
     */
    public function setLayout($template): void
    {
        $this->templates['layout'] = $template;
    }


    /**
     * @param string $template
     */
    public function setMainTemplate($template): void
    {
        $this->templates['main'] = $template;
    }


    /**
     * @return array
     */
    public function getTemplates(): array
    {
        return $this->templates;
    }


    /**
     * @param array $templates
     */
    public function setTemplates(array $templates): void
    {
        $this->templates = $templates;
    }
}
