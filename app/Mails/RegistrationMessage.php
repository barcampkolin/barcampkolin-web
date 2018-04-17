<?php

namespace App\Mails;

class RegistrationMessage extends BaseMessage implements IMessage
{
    private $body;


    /**
     * RegistrationMessage constructor.
     * @param string $recipient
     */
    public function __construct($recipient, $data)
    {
        $this->addRecipient($recipient);
        $this->setSubject($data['subject']);
        $this->body = $data['body'];
    }


    /**
     * @return ITemplate
     */
    public function getTemplate()
    {
        return new MessageStringTemplate($this->body);
    }


    /**
     * @return mixed
     */
    public function getBody()
    {
        return $this->body;
    }


    /**
     * @param mixed $body
     */
    public function setBody($body)
    {
        $this->body = $body;
    }


}
