<?php

namespace App\Mails;

use App\Model\MailerManager;
use Nette\InvalidStateException;

abstract class BaseMessage implements IMessage
{
    protected ?MailerManager $manager = null;

    protected array $recipients = [];

    protected string $subject = '';

    protected array $parameters = [];


    public function addRecipient(string $recipient): void
    {
        $this->recipients[] = $recipient;
    }


    public function getTemplateParameters(): array
    {
        return $this->parameters;
    }


    public function setTemplateParameters(array $parameters): void
    {
        $this->parameters = $parameters;
    }


    public function addTemplateParameter(string $name, string $value): void
    {
        $this->parameters[$name] = $value;
    }


    public function setManager(?MailerManager $manager = null): void
    {
        $this->manager = $manager;
    }


    /** Short way to send mail */
    public function send(): void
    {
        if (!$this->manager) {
            throw new InvalidStateException('Mailer manager is not set, use any Mailer to send Message');
        }

        $this->manager->send($this);
    }


    public function getRecipients(): array
    {
        return $this->recipients;
    }


    public function getSubject(): string
    {
        return $this->subject;
    }


    public function setSubject(string $subject): void
    {
        $this->subject = $subject;
    }
}
