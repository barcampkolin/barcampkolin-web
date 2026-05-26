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
use Nette\Mail\Mailer;
use Nette\Mail\Message;

readonly class MailerManager
{
    public function __construct(
        private array $config,
        private string  $tempdir,
        private Mailer $mailer,
        private MailDynamicLoader $mailLoader
    ) {
    }


    public function getDynamicMessage(
        ?string $recipient,
        string $mailTemplateId,
        array $parameters = []
    ): UniversalDynamicMessage {
        $mail = $this->mailLoader->getMailById($mailTemplateId);

        $message = new UniversalDynamicMessage();
        if ($recipient !== null) {
            $message->addRecipient($recipient);
        }
        $message->setSubject($mail['subject']);
        $message->setTemplateFromString($mail);
        $message->setTemplateParameters($parameters);
        $message->setManager($this);

        return $message;
    }


    public function getRegistrationMessage(string $recipient): RegistrationMessage
    {
        $mail = $this->mailLoader->getMailById('registration');

        $message = new RegistrationMessage($recipient, $mail);
        $message->setManager($this);
        return $message;
    }


    public function getResetPasswordMessage(string $recipient, string $tokenUrl): ResetPasswordMessage
    {
        $mail = $this->mailLoader->getMailById('reset-password');

        $message = new ResetPasswordMessage($recipient, $mail, $tokenUrl);
        $message->setManager($this);
        return $message;
    }


    public function getVoteAnnounceMessage(string $recipient): VoteAnnounceMessage
    {
        $mail = $this->mailLoader->getMailById('vote-announce');

        $message = new VoteAnnounceMessage($recipient, $mail);
        $message->setManager($this);
        return $message;
    }


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


    public function compileBody(IMessage $message): string
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
