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


    public function __construct(
        private readonly ConfigManager $configManager
    ) {
    }


    public function getMails(): array
    {
        $mails = [];
        foreach ($this->structure as $key => $struct) {
            $mails[$key] = $struct['title'];
        }
        return $mails;
    }


    public function getLayouts(): array
    {
        return array_map(static fn($struct) => $struct['title'], $this->layouts);
    }


    public function getMailById(string $id): array
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


    public function setMail(
        string $id,
        string $subject,
        string $body,
        string $header,
        string $preheader,
        string $purpose
    ): void {
        $this->validateId($id);

        $this->saveMail($id, $subject, $body, $header, $preheader, $purpose);
    }


    public function setLayout(string $body): void
    {
        $id = 'layout';

        $this->saveLayout($id, $body);
    }


    private function validateId(string $id): void
    {
        if (!isset($this->structure[$id])) {
            throw new EntityNotFound("Mail with ID '$id' not found.");
        }
    }


    private function loadMail(string $id): array
    {
        $configKey = $this->getMailConfigKey($id);

        return $this->loadTemplate($configKey);
    }


    private function loadLayout(string $id): array
    {
        $configKey = $this->getLayoutConfigKey($id);

        return $this->loadTemplate($configKey);
    }


    private function saveMail(
        string $id,
        string $subject,
        string $body,
        string $header,
        string $preheader,
        string $purpose
    ): void {
        $configKey = $this->getMailConfigKey($id);

        $this->saveTemplate($configKey, [
            'subject' => $subject,
            'body' => $body,
            'header' => $header,
            'preheader' => $preheader,
            'purpose' => $purpose,
        ]);
    }


    private function saveLayout(string $id, string $body): void
    {
        $configKey = $this->getLayoutConfigKey($id);

        $this->saveTemplate($configKey, [
            'body' => $body,
        ]);
    }


    private function getMailConfigKey(string $mailId): string
    {
        return sprintf("mail.content.%s", $mailId);
    }


    private function getLayoutConfigKey(string $mailId): string
    {
        return sprintf("mail.layout.%s", $mailId);
    }


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


    private function saveTemplate(string $configKey, array $mail): void
    {
        $this->configManager->set($configKey, $mail);
    }
}
