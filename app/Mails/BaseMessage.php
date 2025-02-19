<?php

namespace App\Mails;

use App\Model\MailerManager;
use Nette\InvalidStateException;
use Nette\Mail\SendException;

abstract class BaseMessage
{
    /**
     * @var MailerManager|null
     */
    protected $manager;

    /**
     * @var array
     */
    protected $recipients = [];

    /**
     * @var string
     */
    protected $subject;

    protected $parameters = [];


    /**
     * @param string $recipient
     */
    public function addRecipient($recipient): void
    {
        $this->recipients[] = $recipient;
    }


    /**
     * @return array
     */
    public function getTemplateParameters()
    {
        return $this->parameters;
    }


    /**
     * @param array $parameters
     */
    public function setTemplateParameters($parameters): void
    {
        $this->parameters = $parameters;
    }


    /**
     * @param string $name
     * @param string $value
     */
    public function addTemplateParameter($name, $value): void
    {
        $this->parameters[$name] = $value;
    }


    /**
     * @param MailerManager|null $manager
     */
    public function setManager(MailerManager $manager = null): void
    {
        $this->manager = $manager;
    }


    /**
     * Short way to send mail
     * @throws SendException
     */
    public function send(): void
    {
        if (!$this->manager) {
            throw new InvalidStateException('Mailer manager is not set, use any Mailer to send Message');
        }

        $this->manager->send($this);
    }


    /**
     * @return array
     */
    public function getRecipients()
    {
        return $this->recipients;
    }


    /**
     * @return string
     */
    public function getSubject()
    {
        return $this->subject;
    }


    /**
     * @param string $subject
     */
    public function setSubject($subject): void
    {
        $this->subject = $subject;
    }
}
