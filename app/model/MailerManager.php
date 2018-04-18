<?php

namespace App\Model;

use App\Mails\IMessage;
use App\Mails\ITemplate;
use App\Mails\MessageLatteTemplate;
use App\Mails\MessageStringTemplate;
use App\Mails\RegistrationMessage;
use App\Mails\ResetPasswordMessage;
use App\Mails\VoteAnnounceMessage;
use Latte;
use Nette\Mail\IMailer;
use Nette\Mail\Message;

class MailerManager
{
    /**
     * @var array
     */
    private $config;
    /**
     * @var string
     */
    private $tempdir;
    /**
     * @var IMailer
     */
    private $mailer;
    /**
     * @var MailDynamicLoader
     */
    private $mailLoader;


    /**
     * MailerManager constructor.
     * @param array $config
     * @param string $tempdir
     * @param IMailer $mailer
     * @param MailDynamicLoader $mailLoader
     */
    public function __construct($config, $tempdir, IMailer $mailer, MailDynamicLoader $mailLoader)
    {
        $this->config = $config;
        $this->tempdir = $tempdir;
        $this->mailer = $mailer;
        $this->mailLoader = $mailLoader;
    }


    /**
     * @param $recipient
     * @return RegistrationMessage
     * @throws EntityNotFound
     * @throws \Nette\Utils\JsonException
     */
    public function getRegistrationMessage($recipient)
    {
        $mail = $this->mailLoader->getMailById('registration');

        $message = new RegistrationMessage($recipient, $mail);
        $message->setManager($this);
        return $message;
    }


    public function getResetPasswordMessage($recipient, $tokenUrl)
    {
        $message = new ResetPasswordMessage($recipient, $tokenUrl);
        $message->setManager($this);
        return $message;
    }


    /**
     * @param $recipient
     * @return VoteAnnounceMessage
     * @throws EntityNotFound
     * @throws \Nette\Utils\JsonException
     */
    public function getVoteAnnounceMessage($recipient)
    {
        $mail = $this->mailLoader->getMailById('vote-announce');

        $message = new VoteAnnounceMessage($recipient, $mail);
        $message->setManager($this);
        return $message;
    }


    /**
     * @param IMessage $message
     */
    public function send(IMessage $message)
    {
        /** @var ITemplate|MessageLatteTemplate|MessageStringTemplate $template */
        $template = $message->getTemplate();

        $mail = new Message();

        if ($template instanceof MessageLatteTemplate) {
            $latte = new Latte\Engine();
            $latte->setTempDirectory($this->tempdir);

            $body = $latte->renderToString($template->getFilename(), $message->getTemplateParameters());
        } else {
            $body = $template->getContent();
        }

        $mail->setHtmlBody($body);

        $mail->setFrom($this->config['from']);
        $mail->setSubject($message->getSubject());

        foreach ($message->getRecipients() as $recipient) {
            $mail->addTo($recipient);
        }

        $this->mailer->send($mail);
    }

}
