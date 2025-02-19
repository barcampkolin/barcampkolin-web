<?php

namespace App\Model;

class MailDynamicLoader
{
    private array $layouts = [
        'layout' => [
            'title' => 'Layout',
        ],
    ];

    private array $structure = [
        'registration' => [
            'title' => 'Registrace',
            'params' => [],
        ],
        'reset-password' => [
            'title' => 'Reset hesla',
            'params' => [
                'tokenUrl' => 'URL na reset hesla'
            ],
        ],
        'registration-announce' => [
            'title' => 'Ohlášení spuštění možnosti vypsání si přednášky',
            'params' => [],
        ],
        'vote-announce' => [
            'title' => 'Ohlášení hlasování přednášek',
            'params' => [],
        ],

        'before-event-announce' => [
            'title' => 'E-mail před konáním barcampu',
            'params' => [],
        ],
        'after-event-announce' => [
            'title' => 'E-mail po konání barcampu',
            'params' => [
                'formLink' => 'URL na formulář'
            ],
        ],
        'report-publish-announce' => [
            'title' => 'E-mail po vydání vídeí na YouTube',
            'params' => [],
        ],
        'announce-speakers-success' => [
            'title' => 'Informace o úšpěšném prohlasování do Programu (řečníci)',
            'params' => [],
        ],
        'announce-speakers-unsuccess' => [
            'title' => 'Informacemi o neúšpěšném prohlasování do Programu (řečníci)',
            'params' => [],
        ],
        'program-announce' => [
            'title' => 'Oznámení zveřejněného programu',
            'params' => [],
        ],
        'free-template-1' => [
            'title' => 'Informace pro přednášející',
            'params' => [],
        ],
        'free-template-2' => [
            'title' => 'Volná šablona 2',
            'params' => [],
        ],
        'free-template-3' => [
            'title' => 'Volná šablona 3',
            'params' => [],
        ],
        'free-template-4' => [
            'title' => 'Volná šablona 4',
            'params' => [],
        ],
    ];


    /**
     * MailDynamicLoader constructor.
     * @param ConfigManager $configManager
     */
    public function __construct(private readonly ConfigManager $configManager)
    {
    }


    /**
     * @return array
     */
    public function getMails(): array
    {
        $mails = [];
        foreach ($this->structure as $key => $struct) {
            $mails[$key] = $struct['title'];
        }
        return $mails;
    }


    /**
     * @return array
     */
    public function getLayouts(): array
    {
        $mails = [];
        foreach ($this->layouts as $key => $struct) {
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
    public function getMailById($id): array
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
            'header' => $data['header'],
            'preheader' => $data['preheader'],
            'purpose' => $data['purpose'],
        ];
    }


    /**
     * @return array
     * @throws \Nette\Utils\JsonException
     */
    public function getLayout(): array
    {
        $id = 'layout';
        $struct = $this->layouts[$id];
        $data = $this->loadLayout($id);

        return [
            'id' => $id,
            'title' => $struct['title'],
            'body' => $data['body'],
        ];
    }


    /**
     * @param string $id
     * @param string $subject
     * @param string $body
     * @param $header
     * @param $preheader
     * @param $purpose
     * @throws EntityNotFound
     * @throws \Nette\Utils\JsonException
     */
    public function setMail($id, $subject, $body, $header, $preheader, $purpose): void
    {
        $this->validateId($id);

        $this->saveMail($id, $subject, $body, $header, $preheader, $purpose);
    }


    /**
     * @param $body
     * @throws \Nette\Utils\JsonException
     */
    public function setLayout($body): void
    {
        $id = 'layout';

        $this->saveLayout($id, $body);
    }


    /**
     * @param string $id
     * @throws EntityNotFound
     */
    private function validateId($id): void
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
    private function loadMail($id): array
    {
        $configKey = $this->getMailConfigKey($id);

        return $this->loadTemplate($configKey);
    }


    /**
     * @param string $id
     * @return array
     * @throws \Nette\Utils\JsonException
     */
    private function loadLayout(string $id): array
    {
        $configKey = $this->getLayoutConfigKey($id);

        return $this->loadTemplate($configKey);
    }


    /**
     * @param string $id
     * @param string $subject
     * @param string $body
     * @param string $header
     * @param string $preheader
     * @param string $purpose
     * @throws \Nette\Utils\JsonException
     */
    private function saveMail($id, $subject, $body, $header, $preheader, $purpose): void
    {
        $configKey = $this->getMailConfigKey($id);

        $this->saveTemplate($configKey, [
            'subject' => $subject,
            'body' => $body,
            'header' => $header,
            'preheader' => $preheader,
            'purpose' => $purpose,
        ]);
    }


    /**
     * @param $id
     * @param $body
     * @throws \Nette\Utils\JsonException
     */
    private function saveLayout(string $id, $body): void
    {
        $configKey = $this->getLayoutConfigKey($id);

        $this->saveTemplate($configKey, [
            'body' => $body,
        ]);
    }


    /**
     * @param string $mailId
     * @return string
     */
    private function getMailConfigKey($mailId): string
    {
        return sprintf("mail.content.%s", $mailId);
    }


    /**
     * @param string $mailId
     * @return string
     */
    private function getLayoutConfigKey(string $mailId): string
    {
        return sprintf("mail.layout.%s", $mailId);
    }


    /**
     * @param $configKey
     * @return array
     * @throws \Nette\Utils\JsonException
     */
    private function loadTemplate(string $configKey): array
    {
        $data = $this->configManager->get($configKey);

        $mail = [];

        foreach (['subject', 'body', 'header', 'preheader', 'purpose'] as $key) {
            $mail[$key] = null;

            if (isset($data[$key])) {
                $mail[$key] = $data[$key];
            }
        }

        return $mail;
    }


    /**
     * @param $configKey
     * @param array $mail
     * @throws \Nette\Utils\JsonException
     */
    private function saveTemplate(string $configKey, array $mail): void
    {
        $this->configManager->set($configKey, $mail);
    }
}
