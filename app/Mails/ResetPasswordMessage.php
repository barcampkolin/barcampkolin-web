<?php

namespace App\Mails;

class ResetPasswordMessage extends UniversalDynamicMessage
{
    public function __construct(string $recipient, array $mail, string $tokenUrl)
    {
        $this->addRecipient($recipient);
        $this->setSubject($mail['subject']);
        $this->setTemplateFromString($mail);
        $this->addTemplateParameter('tokenUrl', $tokenUrl);
    }
}
