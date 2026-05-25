<?php

namespace App\Mails;

class VoteAnnounceMessage extends UniversalDynamicMessage
{
    public function __construct(string $recipient, array $mail)
    {
        $this->addRecipient($recipient);
        $this->setSubject($mail['subject']);
        $this->setTemlateFromString($mail);
    }
}
