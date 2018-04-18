<?php

namespace App\Mails;

class ResetPasswordMessage extends BaseMessage implements IMessage
{

    /**
     * RegistrationMessage constructor.
     * @param string $recipient
     * @param string $tokenUrl
     */
    public function __construct($recipient, $tokenUrl)
    {
        $this->addRecipient($recipient);
        $this->setSubject('Reset tvého hesla');
        $this->addTemplateParameter('tokenUrl', $tokenUrl);
    }


    /**
     * @return ITemplate
     */
    public function getTemplate()
    {
        return new MessageLatteTemplate(__DIR__ . '/templates/resetPassword.latte');
    }
}
