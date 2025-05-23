<?php

namespace App\AdminModule\Presenters;

use App\Model\ConfereeManager;
use App\Model\IdentityManager;
use App\Model\TalkManager;
use App\Model\UserManager;
use App\Orm\Conferee\Conferee;
use App\Orm\Identity\Identity;
use App\Orm\Program\Program;
use App\Orm\Talk\Talk;
use App\Orm\UserRole\UserRole;
use DateInterval;
use Nette\Application\UI\Form;
use Nette\Forms\Controls\HiddenField;
use Nette\Forms\Controls\SubmitButton;
use Nette\Utils\ArrayHash;
use Nette\Utils\Json;
use Nette\Utils\JsonException;
use Nextras\Orm\Collection\ICollection;
use Ublaboo\DataGrid\Column\Action\Confirmation\StringConfirmation;
use Ublaboo\DataGrid\DataGrid;
use Ublaboo\DataGrid\Exception\DataGridException;

class ConferencePresenter extends BasePresenter
{
    /**
     * ConferencePreseneter constructor.
     * @param ConfereeManager $confereeManager
     * @param TalkManager $talkManager
     * @param IdentityManager $identityManager
     * @param UserManager $userManager
     */
    public function __construct(
        private readonly ConfereeManager $confereeManager,
        private readonly TalkManager $talkManager,
        private readonly IdentityManager $identityManager,
        private readonly UserManager $userManager
    ) {
        parent::__construct();
    }


    public function renderConferee(): void
    {
        $this->template->count = $this->confereeManager->findAll()->countStored();
    }


    /**
     * @param $name
     * @throws DataGridException
     * @throws \InvalidArgumentException
     * @throws \Ublaboo\DataGrid\Exception\DataGridColumnStatusException
     */
    public function createComponentConfereeDatagrid($name): void
    {
        $grid = new DataGrid($this, $name);

        $grid->setDataSource($this->confereeManager->findAll());

        $grid->addColumnText('name', 'Jméno');
        $grid->addColumnText('email', 'E-mail');

        $onStatusChange = function ($id, $status) use ($grid): void {
            /** @var Conferee $conferee */
            $conferee = $this->confereeManager->getById($id);
            $conferee->setValue('enabled', $status);
            $this->confereeManager->save($conferee);

            if ($this->isAjax()) {
                $grid->redrawItem($id);
            }
        };

        $grid->addColumnStatus('enabled', 'Účast')
            ->addOption(true, 'Přihlášený')
            ->endOption()
            ->addOption(false, 'Účast zrušena')
            ->setClass('btn-danger')
            ->endOption()
            ->onChange[] = $onStatusChange;

        $grid->addAction('confereeEdit', 'Upravit')->setTitle('Upravit uživatele');
    }


    /**
     * @param $id
     * @throws \Nette\Application\BadRequestException
     */
    public function renderConfereeEdit($id): void
    {
        $conferee = $this->confereeManager->getById($id);

        $this->validateConferee($conferee);

        $this->template->conferee = $conferee;

        /** @var HiddenField $idField */
        $idField = $this['confereeDeleteForm']['id'];
        $idField->setDefaultValue($id);

        $this['confereeEditForm']->setDefaults([
            'id' => $conferee->id,
            'name' => $conferee->name,
            'email' => $conferee->email,
            'pictureUrl' => $conferee->pictureUrl,
            'bio' => $conferee->bio,
        ]);
    }


    /**
     * @return Form
     */
    public function createComponentConfereeEditForm(): \Nette\Application\UI\Form
    {
        $form = new Form();

        $form->addHidden('id');

        $form->addText('name', 'Jméno')->setRequired();
        $form->addEmail('email', 'E-mail')->setRequired();
        $form->addText('pictureUrl', 'URL obrázku')
            ->setOption('description', 'URL profilového obrázku.');
        $form->addTextArea('bio', 'Bio');


        $form->addSubmit('submit', 'Uložit')->setOption('primary', true);

        $form->addProtection();

        $form->onSuccess[] = $this->onConfereeEditFormSuccess(...);

        return $form;
    }


    /**
     * @return Form
     */
    public function createComponentConfereeDeleteForm(): \Nette\Application\UI\Form
    {
        $form = new Form();

        $form->addHidden('id');
        $form->addSubmit('delete', 'Smazat')->setOption('primary', true);

        $form->addProtection();

        $form->onSuccess[] = $this->onConfereeDeleteFormSuccess(...);

        return $form;
    }


    /**
     * @param Form $form
     * @param $values
     * @throws \Nette\Application\AbortException
     * @throws \Nette\Application\BadRequestException
     */
    public function onConfereeEditFormSuccess(Form $form, $values): void
    {
        $id = $values->id;
        $conferee = $this->confereeManager->getById($id);
        $this->validateConferee($conferee);

        $conferee->name = $values->name;
        $conferee->email = $values->email;
        $conferee->pictureUrl = $values->pictureUrl;
        $conferee->bio = $values->bio;

        $user = $conferee->user;

        $user->name = $values->name;
        $user->email = $values->email;
        $user->pictureUrl = $values->pictureUrl;

        $this->confereeManager->save($conferee);

        $this->flashMessage('Uživatel uložen', 'success');
        $this->redirect('conferee');
    }


    /**
     * @param Form $form
     * @param $values
     * @throws \Nette\Application\AbortException
     * @throws \Nette\Application\BadRequestException
     */
    public function onConfereeDeleteFormSuccess(Form $form, $values): void
    {
        /** @var SubmitButton $delete */
        $delete = $form['delete'];
        if ($delete->isSubmittedBy()) {
            $id = $values->id;
            $conferee = $this->confereeManager->getById($id);
            $this->validateConferee($conferee);
            $this->deleteConferee($conferee);

            $this->flashMessage('Uživatel smazán', 'success');
        }
        $this->redirect('conferee');
    }


    /**
     * Remove user with all dependecies
     * @param Conferee $conferee
     */
    private function deleteConferee(Conferee $conferee): void
    {
        /** @var Talk $talk */
        foreach ($conferee->talk as $talk) {
            $this->talkManager->remove($talk);
        }

        /** @var Identity $identity */
        foreach ($conferee->user->identity as $identity) {
            $this->identityManager->remove($identity);
        }

        /** @var UserRole $role */
        foreach ($conferee->user->role as $role) {
            $this->userManager->removeRole($role);
        }

        $this->userManager->remove($conferee->user);

        $this->confereeManager->remove($conferee);
    }


    public function handleExportConfereeCsv(): void
    {
        $allConferee = $this->confereeManager->findAll();


        $fileDatePostfix = gmdate("Ymd.his");
        header("Cache-Control: max-age=0, no-cache, no-store, must-revalidate, proxy-revalidate");
        header("Content-Type: application/octet-stream");
        header("Content-Disposition: attachment;filename=users-{$fileDatePostfix}.csv");

        $df = fopen("php://output", 'wb');

        fputcsv(
            $df,
            [
                "E-mail",
                "Jméno",
                "Přihlášen",
                "Newsletter",
                "Přednášející",
                "Registrace",
                "Bio",
                "Firma"
            ],
            ',',
            '"',
            '',
        );

        /** @var Conferee $conferee */
        foreach ($allConferee as $conferee) {
            try {
                $extended = Json::decode($conferee->extended, Json::FORCE_ARRAY);
            } catch (JsonException) {
                $extended = [];
            }
            @fputcsv(
                $df,
                [
                    $conferee->email,
                    $conferee->name,
                    'Ano',
                    $conferee->allowMail ? 'Ano' : 'Ne',
                    count($conferee->talk) ? 'Ano' : 'Ne',
                    $conferee->created->format(\DateTime::ATOM),
                    $conferee->bio,
                    $extended['company'] ?? null,
                ],
                ',',
                '"',
                '',
            );
        }

        fclose($df);
        $this->terminate();
    }


    public function renderTalks(): void
    {
        $this->template->count = $this->talkManager->findAll()->countStored();
    }


    /**
     * @param $name
     * @throws \App\Model\InvalidEnumeratorSetException
     * @throws \Nette\Utils\JsonException
     * @throws \Ublaboo\DataGrid\Exception\DataGridColumnStatusException
     * @throws DataGridException
     */
    public function createComponentTalksDatagrid($name): void
    {
        $categories = $this->talkManager->getCategories();
        $rooms = $this->talkManager->getRooms();


        $grid = new DataGrid($this, $name);
        DataGrid::$iconPrefix = 'glyphicon glyphicon-';

        $grid->setDataSource($this->talkManager->findAll());

        $grid->addColumnLink('title', 'Název', ':Conference:talkDetail', 'title', ['id'])
            ->setSortable()
            ->setFilterText('title');

        $grid->addColumnText('speaker', 'Jméno', 'conferee.name')
            ->setSortable();

        $grid->addColumnText('mail', 'Mail', 'conferee.email')
            ->setSortable();

        $grid->addColumnText('votes', 'Hlasy')
            ->setSortable();

        $grid->addColumnCallback('votes', function ($column, $talk): void {
            /** @var Talk $talk */
            $column->setRenderer(function () use ($talk) {
                if ($talk->voteCoefficient != 0) {
                    return $talk->votes . " (koef: $talk->voteCoefficient)";
                } else {
                    return $talk->votes;
                }
            });
        });


        $grid->addColumnText('category', 'Kategorie')
            ->setReplacement($categories);

        $onStatusChange = function ($id, $status) use ($grid): void {
            /** @var Talk $talk */
            $talk = $this->talkManager->getById($id);
            $talk->setValue('enabled', $status);
            $this->talkManager->save($talk);

            if ($this->isAjax()) {
                $grid->redrawItem($id);
            }
        };

        $grid->addColumnStatus('enabled', 'Aktivní')
            ->addOption(1, 'Aktivní')
            ->endOption()
            ->addOption(0, 'Zrušená')
            ->setClass('btn-danger')
            ->endOption()
            ->onChange[] = $onStatusChange;

        $grid->addAction('edit', '', 'talkEdit')
            ->setIcon('pencil')
            ->setTitle('Upravit');
    }


    /**
     * @param $id
     * @throws \Nette\Application\BadRequestException
     * @throws \Nette\Utils\JsonException
     */
    public function renderTalkEdit($id): void
    {
        /** @var Talk $talk */
        $talk = $this->talkManager->getById($id);

        if (!$talk) {
            $this->error('přednáška nenalezena');
        }

        $extensions = $talk->getExpandedExtensions();

        $this->template->talk = $talk;
        $this->template->extended = $extensions;

        /** @var Form $form */
        $form = $this['talkForm'];

        $values = $talk->toArray();
        $values['ogImageUrl'] = $extensions['ogImageUrl'] ?? null;

        $form->setDefaults($values);
    }


    public function renderEditLink($talkId, $type, $key): void
    {
        $talk = $this->talkManager->getById($talkId);
        $links = $talk->getLinksByType($type);

        if (!$talk) {
            $this->error('Talk nemáme');
        }

        $this->template->talk = $talk;

        $link = null;
        if (isset($links[$key])) {
            $link = $links[$key];
        } elseif ($key == 'new') {
            $link = [
                'name' => $talk->conferee->name . ": " . $talk->title,
                'url' => '',
            ];
        } else {
            $this->error('Odkaz nemáme');
        }

        /** @var Form $form */
        $form = $this['linkEditForm'];
        $form->setDefaults([
            'name' => $link['name'],
            'url' => $link['url'],
            'talkId' => $talkId,
            'type' => $type,
            'key' => $key,
        ]);
    }


    public function createComponentLinkEditForm(): \Nette\Application\UI\Form
    {
        $form = new Form();

        $form->addText('name', 'Popis')->setRequired();
        $form->addText('url', 'URL odkazu')->setRequired()->addRule(Form::URL);

        $form->addHidden('talkId');
        $form->addHidden('key');
        $form->addHidden('type');

        $form->addProtection();

        $form->addSubmit('submit', 'Uložit');

        $form->onSuccess[] = function (Form $form, $values): void {
            $talk = $this->talkManager->getById($values->talkId);
            $links = $talk->getLinksByType($values->type);
            $link = [
                'name' => $values->name,
                'url' => $values->url,
            ];
            if ($values->key == 'new') {
                $links[] = $link;
            } else {
                $links[$values->key] = $link;
            }
            $talk->setLinksByType($values->type, $links);
            $this->talkManager->save($talk);
            $this->redirect('talkEdit', ['id' => $values->talkId]);
        };

        return $form;
    }


    /**
     * @secured
     * @param $talkId
     * @param $type
     * @param $key
     * @throws \Nette\Application\AbortException
     */
    public function handleDeleteLink($talkId, $type, $key): void
    {
        $talk = $this->talkManager->getById($talkId);
        $links = $talk->getLinksByType($type);
        unset($links[$key]);
        $talk->setLinksByType($type, $links);
        $this->talkManager->save($talk);
        $this->redirect('talkEdit', ['id' => $talkId]);
    }


    /**
     * @return Form
     * @throws \App\Model\InvalidEnumeratorSetException
     * @throws \Nette\Utils\JsonException
     */
    public function createComponentTalkForm(): \Nette\Application\UI\Form
    {
        $form = new Form();

        $form->addHidden('id');

        $form->addText('title', 'Název');
        $form->addTextArea('description', 'Popis');
        $form->addTextArea('purpose', 'Pro koho je určena');
        $form->addSelect('category', 'Kategorie', $this->talkManager->getCategories());
        $form->addText('company', 'Firma');
        $form->addText('voteCoefficient', 'Hlasovací koeficient')
            ->setRequired('Hlasovací koeficient musí být vyplněn - zadejte 0.')
            ->addRule(Form::INTEGER, 'Hlasovací koeficient musí být číslo')
            ->setHtmlType('number');
        $form->addText('ogImageUrl', 'OG obrázek')
            ->setRequired(false);

        $form->addSubmit('submit', 'Odeslat')->setOption('primary', true);

        $form->addProtection();

        $form->onSuccess[] = $this->onTalkFormSuccess(...);

        return $form;
    }


    /**
     * @param Form $form
     * @param ArrayHash $values
     * @throws \Nette\Application\BadRequestException
     * @throws \Nette\Application\AbortException
     * @throws \Exception
     */
    public function onTalkFormSuccess(Form $form, $values): void
    {
        $id = $values->id;

        /** @var Talk $talk */
        $talk = $this->talkManager->getById($id);

        if (!$talk) {
            $this->error('Přednáška nenalezena');
        }

        foreach ($values as $key => $value) {
            if ($key === 'id') {
                continue;
            }

            if ($key === 'ogImageUrl') {
                $extended = $talk->getExpandedExtensions();
                $extended['ogImageUrl'] = empty($value) ? null : $value;
                $talk->setExpandedExtenstios($extended);
                continue;
            }

            if ($value === '') {
                $value = null;
            }
            $talk->setValue($key, $value);
        }

        $this->talkManager->save($talk);
        $this->talkManager->recountVote($id);

        $this->flashMessage('Uloženo', 'success');
        $this->redirect('talks');
    }


    /**
     * @param $name
     * @throws JsonException
     * @throws \App\Model\InvalidEnumeratorSetException
     * @throws DataGridException
     */
    public function createComponentProgramDatagrid($name): void
    {
        $rooms = $this->talkManager->getRooms();
        $program = $this->talkManager->findAllProgram()
            ->orderBy('room', ICollection::ASC)
            ->orderBy('time', ICollection::ASC);

        $grid = new DataGrid($this, $name);
        DataGrid::$iconPrefix = 'glyphicon glyphicon-';

        $grid->setDataSource($program);

        $grid->addToolbarButton('programEdit', 'Přidat do programu…')
            ->setClass('btn btn-xs btn-primary')
            ->setIcon('plus');

        $grid->addColumnText('type', 'Typ')
            ->setReplacement($this->talkManager->getProgramTypes());

        $grid->addColumnText('title', 'Název')->setRenderer(function ($row) {
            /** @var Program $row */
            if (empty($row->title) && isset($row->talk)) {
                return $row->talk->title;
            } else {
                return $row->title;
            }
        });

        $grid->addColumnText('speaker', 'Přednášející')->setRenderer(function ($row) {
            /** @var Program $row */
            if (empty($row->speaker) && isset($row->talk)) {
                return $row->talk->conferee->name;
            } else {
                return $row->speaker;
            }
        });

        $grid->addColumnText('room', 'Místnost')
            ->setReplacement($rooms);

        $grid->addColumnText('time', 'Čas')->setRenderer(function ($row): ?string {
            /** @var Program $row */
            if (is_null($row->time)) {
                return null;
            } else {
                return $row->time->format('%H:%I:%S');
            }
        });

        $grid->addColumnText('duration', 'Délka [minuty]');

        $grid->addAction('edit', '', 'programEdit')
            ->setIcon('pencil')
            ->setTitle('Upravit');

        $grid->addAction('delete', '', 'deleteProgram!')
            ->setIcon('trash')
            ->setTitle('Smazat')
            ->setClass('btn btn-xs btn-danger ajax')
            ->setConfirmation(new StringConfirmation('Opravdu chcete smazat z programu přednášku %s?', 'title'));
    }


    /**
     * @param $id
     * @throws \Nette\Application\AbortException
     * @secured
     */
    public function handleDeleteProgram($id): void
    {
        $program = $this->talkManager->getProgramById($id);

        $this->talkManager->removeProgram($program);

        if ($this->isAjax()) {
            $this['programDatagrid']->reload();
        } else {
            $this->redirect('this');
        }
    }


    /**
     *
     * @return mixed[]
     * @throws JsonException
     */
    public function getMergedTalks(): array
    {
        $talks = $this->talkManager->findAll()->orderBy('votes', ICollection::DESC);

        $usedTalksIds = $this->getProgramListedTalksId();

        $merged = $this->talkManager->getProgramTypes();
        unset($merged['talk']);

        /** @var Talk $talk */
        foreach ($talks as $talk) {
            $id = $talk->id;

            $requestedDuration = "";
            $extended = Json::decode($talk->extended, Json::FORCE_ARRAY);
            $duration = isset($extended['requested_duration']) ? intval($extended['requested_duration']) : null;
            if ($duration) {
                $requestedDuration = " (požadováno $duration minut)";
            }

            $merged['talk|' . $id] = sprintf(
                'Přednáška: %s [%s] %s | %s%s',
                in_array($id, $usedTalksIds) ? '●' : '○',
                $talk->votes,
                $talk->conferee->name,
                $talk->title,
                $requestedDuration
            );
        }

        return $merged;
    }


    private function getProgramStyles(): array
    {
        return [
            null => 'Výchozí barva',
            'style0' => 'Šedá',
            'style1' => 'Modrá',
            'style2' => 'Oranžová',
            'style3' => 'Červená',
            'style4' => 'Tyrkysová',
            'style5' => 'Fialová',
            'style6' => 'Zelená (Osobní rozvoj)',
            'style7' => 'Oranžová (Byznys)',
            'style8' => 'Modrá (Technická)',
        ];
    }


    /**
     * @return array
     */
    private function getProgramListedTalksId(): array
    {
        $program = $this->talkManager->findAllProgram();
        $ids = [];

        /** @var Program $item */
        foreach ($program as $item) {
            if ($item->talk) {
                $ids[] = $item->talk->id;
            }
        }

        return $ids;
    }


    /**
     * @param null|id $id
     * @throws \Nette\Application\BadRequestException
     */
    public function renderProgramEdit($id = null): void
    {
        if ($id === null) {
            return;
        }
        /** @var Program $program */
        $program = $this->talkManager->getProgramById($id);

        if (!$program) {
            $this->error('Program nenalezen');
        }

        /** @var Form $form */
        $form = $this['programForm'];

        $values = $program->toArray();
        $values['time'] = is_null($values['time']) ? '' : $values['time']->format('%H:%I:%S');
        $values['type'] = $program->talk ? $program->type . '|' . $program->talk->id : $program->type;

        $form->setDefaults($values);
    }


    /**
     * @return Form
     * @throws JsonException
     * @throws \App\Model\InvalidEnumeratorSetException
     */
    public function createComponentProgramForm(): \Nette\Application\UI\Form
    {
        $durations = $this->talkManager->getDurations();
        $durations += $this->talkManager->getDurationChoice();
        $durations = array_filter($durations, fn($item): int => intval($item), ARRAY_FILTER_USE_KEY);

        $form = new Form();

        $form->addGroup();

        $form->addHidden('id');

        $type = $form->addSelect('type', 'Type', [null => '== Vyberte =='] + $this->getMergedTalks())
            ->setRequired(true)
            ->setOption('description', 'Legenda symbolů: ● - již v programu; ○ - není v programu; [123] - počet hlasů')
            ->getControlPrototype()->appendAttribute('class', 'ui search dropdown form-control');
        $form->addRadioList('room', 'Místnost', $this->talkManager->getRooms())->setRequired(true);
        $form->addText('time', 'Čas konání')->setType('time')->setRequired(true);
        $form->addRadioList('duration', 'Délka v minutách', $durations)->setRequired();

        $form->addSubmit('submit', 'Uložit')->setOption('primary', true);

        $form->addGroup('Vlastní název přednášky v programu');

        $form->addTextArea('title', 'Název')
            ->setOption(
                'description',
                'Volitelné. Zadejte jen pokud je potřeba v programu název přednášky přepsat. Povolené HTML'
            );
        $form->addText('speaker', 'Přednášející', null, 200)
            ->setOption(
                'description',
                'Volitelné. Zadejte jen pokud je potřeba v programu název speakera přepsat. Max. 200 znaků'
            );

        $form->addSelect('style', 'Styl (barva)', $this->getProgramStyles())
            ->setOption(
                'description',
                'Volitelné. Nastavení barvy přetíží barvu kategorie.'
            );

        $form->addSelect('category', 'Kategorie', $this->talkManager->getCategories());

        $form->addGroup();

        $form->addSubmit('submit_rename', 'Uložit a přejmenovat')->setOption('primary', true);

        $form->addProtection();

        $form->onSuccess[] = $this->onProgramFormSuccess(...);

        return $form;
    }


    /**
     * @param Form $form
     * @param $values
     * @throws \Exception
     * @throws \Nette\Application\AbortException
     */
    public function onProgramFormSuccess(Form $form, $values): void
    {
        $id = $values->id;

        /** @var Program $program */
        $program = $this->talkManager->getProgramById($id);

        if (!$program) {
            $program = new Program;
        }

        foreach ($values as $key => $value) {
            if (in_array($key, ['id'])) {
                continue;
            }

            if ($key === 'time') {
                if (preg_match('#^(-?)(\d+):(\d+)#', (string)$value, $m)) {
                    $value = new DateInterval("PT{$m[2]}H{$m[3]}M");
                } else {
                    $values = null;
                }
            }

            if ($key === 'type') {
                [$type, $talkId] = array_pad(explode('|', (string)$value, 2), 2, null);
                $program->type = $type;
                if ($talkId) {
                    $program->talk = $this->talkManager->getById($talkId);
                } else {
                    $program->talk = null;
                }
                continue;
            }

            if ($value === '') {
                $value = null;
            }
            $program->setValue($key, $value);
        }

        $this->talkManager->saveProgram($program);

        $this->flashMessage('Uloženo', 'success');
        $this->redirect('program');
    }


    /**
     * @param $conferee
     * @throws \Nette\Application\BadRequestException
     */
    private function validateConferee(?\Nextras\Orm\Entity\IEntity $conferee): void
    {
        if (!$conferee instanceof Conferee) {
            $this->error('Tento účastník nebyl nalezen');
        }
    }
}
