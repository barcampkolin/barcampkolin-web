<?php

namespace App\Mails;

class UniversalDynamicMessage extends BaseMessage implements IMessage
{
    /**
     * @var MessageLatteStringTemplate
     */
    private $template;


    /**
     * RegistrationMessage constructor.
     * @param string $recipient
     * @param array $mail
     * @param $layout
     * @param array $parameters
     */
    public function __construct($recipient, $mail, $layout, $parameters)
    {
        $this->addRecipient($recipient);
        $this->setSubject($mail['subject']);
        $this->setTemplateParameters($parameters);

        $this->setTemplate(new MessageLatteStringTemplate([
            'main' => $this->injectLatteConnectors($mail),
            'layout' => $layout['body'],
        ]));
    }


    private function injectLatteConnectors($mail)
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
bdump($output);
        return $output;
    }


    /**
     * @return ITemplate
     */
    public function getTemplate()
    {
        return $this->template;
    }


    /**
     * @param MessageLatteStringTemplate $template
     */
    public function setTemplate(MessageLatteStringTemplate $template)
    {
        $this->template = $template;
    }
}
