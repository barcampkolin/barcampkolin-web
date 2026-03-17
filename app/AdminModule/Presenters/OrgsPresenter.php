<?php

declare(strict_types=1);

namespace App\AdminModule\Presenters;

use App\Forms\FormFactory;
use App\Model\OrgListModel;
use Exception;
use Nette\Application\UI\Form;
use Nette\Neon\Neon;
use Nette\Utils\ArrayHash;
use Nette\Utils\Json;

class OrgsPresenter extends BasePresenter
{
    public function __construct(
        private readonly OrgListModel $orgListModel,
        private readonly FormFactory $formFactory,
    ) {
        parent::__construct();
    }

    public function renderDefault()
    {
        $this->template->orgs = $this->orgListModel->getOrgs();

        /** @var Form $form */
        $form = $this['updateForm'];
        $form['url']->setDefaultValue($this->orgListModel->getLastUpdateUrl());
    }

    public function renderProcess(
        array $orgs,
        string $url,
        ?string $sourceUrl = null,
        ?string $sourceName = null,
    ) {
        $this->template->sourceUrl = $sourceUrl;
        $this->template->sourceName = $sourceName;

        $form = $this['confirmForm'];

        $filtered = array_map(static function ($org) {
            return array_filter($org, static function ($value) {
                return $value !== null;
            });
        }, $orgs);

        $form['neon']->setValue(Neon::encode($filtered, blockMode: true, indentation: '  '));
        $form['url']->setValue($url);
        $form['data']->setValue(Json::encode($orgs));
    }

    public function createComponentUpdateForm(): Form
    {
        $form = $this->formFactory->create();

        $form->addText('url', 'URL pro aktualizaci seznamu organizátorů')
            ->setRequired('Zadejte URL s aktualizací seznamu organizátorů')
            ->setOption('description', 'URL musí vracet JSON s předepsaným formátem. '
                . 'Pokud nemáte takový zdroj, předvyplněné URL neměňte.')
            ->addRule(Form::URL, 'Zadejte platnou URL adresu');

        $form->addSubmit('submit', 'Stáhnout seznam organizátorů');

        $form->onSuccess[] = function (Form $form, ArrayHash $values) {
            $url = $values->url;

            try {
                $content = @file_get_contents($url);

                if ($content === false) {
                    $error = error_get_last();
                    $message = $error ? $error['message'] : 'Unknown error';
                    throw new Exception("Unable to fetch content from URL, error: $message");
                }

                $headers = http_get_last_response_headers();

                $contentType = '';
                foreach ($headers as $header) {
                    if (str_starts_with(strtolower($header), 'content-type:')) {
                        $contentType = trim(mb_substr($header, mb_strlen('content-type:')));
                    }
                }
                if (!str_starts_with(strtolower($contentType), 'application/json')) {
                    throw new Exception("Expected JSON but server returned: '$contentType'");
                }

                $data = Json::decode($content, forceArrays: true);

                if ($data['status'] !== true) {
                    throw new Exception("Server returned error status: " . ($data['error']['message'] ?? ''));
                }
            } catch (Exception $e) {
                $form->addError(
                    "Nepodařilo se stáhnout novou verzi. Zkontrolujte URL a zkuste to znovu. Detail chyby: "
                    . $e->getMessage()
                );
                return;
            }

            $this->forward(
                'process',
                [
                    'orgs' => $data['data'],
                    'url' => $values->url,
                    'sourceUrl' => $data['source_url'] ?? null,
                    'sourceName' => $data['source_name'] ?? null,
                ]
            );
        };

        return $form;
    }

    public function createComponentConfirmForm(): Form
    {
        $form = $this->formFactory->create();

        $form->addTextArea('neon', 'Kontrola seznamu organizátorů', rows: 40)
            ->setRequired('Zadejte URL s aktualizací seznamu organizátorů')
            ->setOption('description', 'Zkontrolujte data a potvrďte')
            ->setHtmlAttribute('readonly')
            ->setOmitted();

        $form->addHidden('url');

        $form->addHidden('data');

        $form->addSubmit('submit', 'Aktualizovat seznam organizátorů');

        $form->onSuccess[] = function (Form $form, ArrayHash $values) {
            $data = Json::decode($values->data, forceArrays: true);
            $this->orgListModel->update($data, $values['url']);

            $this->flashMessage('Seznam organizátorů byl uložen.', 'success');
            $this->redirect('default');
        };

        return $form;
    }
}
