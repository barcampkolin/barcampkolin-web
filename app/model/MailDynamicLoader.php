<?php

namespace App\Model;

class MailDynamicLoader
{
    /**
     * @var ConfigManager
     */
    private $configManager;

    /**
     * @var array
     */
    private $structure = [
        'registration' => [
            'title' => 'Registrace',
            'params' => [],
        ],
        'vote-announce' => [
            'title' => 'Ohlášení hlasování přednášek',
            'params' => [],
        ],
    ];


    /**
     * MailDynamicLoader constructor.
     * @param ConfigManager $configManager
     */
    public function __construct(ConfigManager $configManager)
    {
        $this->configManager = $configManager;
    }


    /**
     * @return array
     */
    public function getMails()
    {
        $mails = [];
        foreach ($this->structure as $key => $struct) {
            $mails[$key] = $struct['title'];
        }
        return $mails;
    }


    /**
     * @param string $id
     * @return array
     * @throws EntityNotFound
     * @throws \Nette\Utils\JsonException
     */
    public function getMailById($id)
    {
        $this->validateId($id);

        $struct = $this->structure[$id];
        $data = $this->loadMail($id);

        return [
            'id' => $id,
            'title' => $struct['title'],
            'params' => $struct['params'],
            'subject' => $data['subject'],
            'body' => $data['body'],
        ];
    }


    /**
     * @param string $id
     * @param string $subject
     * @param string $body
     * @throws EntityNotFound
     */
    public function setMail($id, $subject, $body)
    {
        $this->validateId($id);

        $this->saveMail($id, $subject, $body);
    }


    /**
     * @param string $id
     * @throws EntityNotFound
     */
    private function validateId($id)
    {
        if (!isset($this->structure[$id])) {
            throw new EntityNotFound("Mail with ID '$id' not found.");
        }
    }


    /**
     * @param string $id
     * @return array
     * @throws \Nette\Utils\JsonException
     */
    private function loadMail($id)
    {
        $data = $this->configManager->get($this->getConfigKey($id));

        $mail = [];

        foreach (['subject', 'body'] as $key) {
            $mail[$key] = null;

            if (isset($data[$key])) {
                $mail[$key] = $data[$key];
            }
        }

        return $mail;
    }


    /**
     * @param string $id
     * @param string $subject
     * @param string $body
     * @throws \Nette\Utils\JsonException
     */
    private function saveMail($id, $subject, $body)
    {
        $mail = [
            'subject' => $subject,
            'body' => $body,
        ];

        $this->configManager->set($this->getConfigKey($id), $mail);
    }


    /**
     * @param string $mailId
     * @return string
     */
    private function getConfigKey($mailId)
    {
        return sprintf("mail.%s", $mailId);
    }
}
