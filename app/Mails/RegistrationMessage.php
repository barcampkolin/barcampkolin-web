<?php

namespace App\Mails;

class RegistrationMessage extends UniversalDynamicMessage implements IMessage
{
    public function __construct(string $recipient, array $mail)
    {
        $this->addRecipient($recipient);
        $this->setSubject($mail['subject']);
        $this->setTemlateFromString($mail);
    }
}
