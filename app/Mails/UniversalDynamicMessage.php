<?php

namespace App\Mails;

class UniversalDynamicMessage extends BaseMessage implements IMessage
{
    private ?\App\Mails\MessageLatteStringTemplate $template = null;


    /**
     * @param array $mail
     * @return string
     */
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


    /**
     * @return ITemplate
     */
    public function getTemplate(): ?\App\Mails\MessageLatteStringTemplate
    {
        return $this->template;
    }


    /**
     * @param MessageLatteStringTemplate $template
     */
    public function setTemplate(MessageLatteStringTemplate $template): void
    {
        $this->template = $template;
    }


    /**
     * @param array $mail
     * @param array $layout
     */
    public function setTemlateFromString(array $mail, $layout = null): void
    {
        $template = new MessageLatteStringTemplate();

        $template->setMainTemplate($this->injectLatteConnectors($mail));

        if ($layout) {
            $this->setLayout($layout);
        }

        $this->setTemplate($template);
    }


    /**
     * @param array $layout
     */
    public function setLayout(array $layout): void
    {
        $this->template->setLayout($layout['body']);
    }


}
