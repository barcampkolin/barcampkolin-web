<?php

namespace App\Mails;

use LogicException;

class UniversalDynamicMessage extends BaseMessage
{
    private ?MessageLatteStringTemplate $template = null;


    private function injectLatteConnectors(array $mail): string
    {

        $format = <<<EOT
            {layout 'layout'}
            %s
            %s
            %s
            {block content}
            %s
            EOT;
        $output = sprintf(
            $format,
            ($mail['header'] ? "{block header}$mail[header]{/block}" : ''),
            ($mail['preheader'] ? "{block preheader}$mail[preheader]{/block}" : ''),
            ($mail['purpose'] ? "{block purpose}$mail[purpose]{/block}" : ''),
            $mail['body']
        );
        return $output;
    }


    public function getTemplate(): MessageLatteStringTemplate
    {
        if(!$this->template) {
            throw new LogicException('Template is not set for this message');
        }

        return $this->template;
    }


    public function setTemplate(MessageLatteStringTemplate $template): void
    {
        $this->template = $template;
    }


    public function setTemlateFromString(array $mail, ?array $layout = null): void
    {
        $template = new MessageLatteStringTemplate();

        $template->setMainTemplate($this->injectLatteConnectors($mail));

        if ($layout) {
            $this->setLayout($layout);
        }

        $this->setTemplate($template);
    }


    public function setLayout(array $layout): void
    {
        $this->template->setLayout($layout['body']);
    }
}
