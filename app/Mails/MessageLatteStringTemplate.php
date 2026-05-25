<?php

namespace App\Mails;

class MessageLatteStringTemplate implements ITemplate
{
    public function __construct(
        private array $templates = []
    ) {
    }


    public function addTemplate(string $key, string $template): void
    {
        $this->templates[$key] = $template;
    }


    public function setLayout(string $template): void
    {
        $this->templates['layout'] = $template;
    }


    public function setMainTemplate(string $template): void
    {
        $this->templates['main'] = $template;
    }


    public function getTemplates(): array
    {
        return $this->templates;
    }


    public function setTemplates(array $templates): void
    {
        $this->templates = $templates;
    }
}
