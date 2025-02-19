<?php

namespace App\Model;

use App\Mails\IMessage;
use App\Mails\MessageLatteFileTemplate;
use App\Mails\MessageLatteStringTemplate;
use App\Mails\MessageStringTemplate;
use App\Mails\RegistrationMessage;
use App\Mails\ResetPasswordMessage;
use App\Mails\UniversalDynamicMessage;
use App\Mails\VoteAnnounceMessage;
use Latte;
use Nette\Mail\IMailer;
use Nette\Mail\Message;

class MailerManager
{
    /**
     * MailerManager constructor.
     * @param array $config
     * @param string $tempdir
     * @param IMailer $mailer
     * @param MailDynamicLoader $mailLoader
     */
    public function __construct(private $config, private $tempdir, private readonly IMailer $mailer, private readonly MailDynamicLoader $mailLoader)
    {
    }


    /**
     * @param $recipient
     * @param $mailTemplateId
     * @param array $parameters
     * @return UniversalDynamicMessage
     * @throws EntityNotFound
     * @throws \Nette\Utils\JsonException
     */
    public function getDynamicMessage($recipient, $mailTemplateId, array $parameters = []): \App\Mails\UniversalDynamicMessage
    {
        $mail = $this->mailLoader->getMailById($mailTemplateId);

        $message = new UniversalDynamicMessage();
        $message->addRecipient($recipient);
        $message->setSubject($mail['subject']);
        $message->setTemlateFromString($mail);
        $message->setTemplateParameters($parameters);
        $message->setManager($this);

        return $message;
    }


    /**
     * @param $recipient
     * @return RegistrationMessage
     * @throws EntityNotFound
     * @throws \Nette\Utils\JsonException
     */
    public function getRegistrationMessage($recipient): \App\Mails\RegistrationMessage
    {
        $mail = $this->mailLoader->getMailById('registration');

        $message = new RegistrationMessage($recipient, $mail);
        $message->setManager($this);
        return $message;
    }


    /**
     * @param $recipient
     * @param $tokenUrl
     * @return ResetPasswordMessage
     * @throws EntityNotFound
     * @throws \Nette\Utils\JsonException
     */
    public function getResetPasswordMessage($recipient, $tokenUrl): \App\Mails\ResetPasswordMessage
    {
        $mail = $this->mailLoader->getMailById('reset-password');

        $message = new ResetPasswordMessage($recipient, $mail, $tokenUrl);
        $message->setManager($this);
        return $message;
    }


    /**
     * @param $recipient
     * @return VoteAnnounceMessage
     * @throws EntityNotFound
     * @throws \Nette\Utils\JsonException
     */
    public function getVoteAnnounceMessage($recipient): \App\Mails\VoteAnnounceMessage
    {
        $mail = $this->mailLoader->getMailById('vote-announce');

        $message = new VoteAnnounceMessage($recipient, $mail);
        $message->setManager($this);
        return $message;
    }


    /**
     * @param IMessage $message
     * @throws \Nette\Utils\JsonException
     * @throws \Nette\Mail\SendException
     */
    public function send(IMessage $message): void
    {
        $mail = new Message();
        $body = $this->compileBody($message);

        $mail->setHtmlBody($body);

        $mail->setFrom($this->config['from']);
        $mail->setSubject($message->getSubject());

        foreach ($message->getRecipients() as $recipient) {
            $mail->addTo($recipient);
        }

        $this->mailer->send($mail);
    }


    /**
     * @param IMessage $message
     * @return string
     * @throws \Nette\Utils\JsonException
     */
    public function compileBody(IMessage $message)
    {
        $template = $message->getTemplate();

        if ($template instanceof MessageLatteFileTemplate) {
            $latte = new Latte\Engine();
            $latte->setTempDirectory($this->tempdir);

            /** @var MessageLatteFileTemplate $template */
            $body = $latte->renderToString($template->getFilename(), $message->getTemplateParameters());
        } elseif ($template instanceof MessageLatteStringTemplate) {
            $latte = new Latte\Engine();
            $latte->setTempDirectory($this->tempdir);

            /** @var MessageLatteStringTemplate $template */
            $layout = $this->mailLoader->getLayout();
            $template->setLayout($layout['body']);

            $latte->setLoader(new Latte\Loaders\StringLoader($template->getTemplates()));
            $body = $latte->renderToString('main', $message->getTemplateParameters());
        } else {
            /** @var MessageStringTemplate $template */
            $body = $template->getContent();
        }
        return $body;
    }

}
