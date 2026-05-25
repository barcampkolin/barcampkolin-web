<?php

namespace App\AdminModule\Presenters;

use App\Model\PartnerLogoStorage;
use App\Model\PartnersManager;
use Nette\Application\UI\Form;
use Nette\Database\ForeignKeyConstraintViolationException;
use Nette\Http\FileUpload;
use Nette\Utils\ArrayHash;
use Ublaboo\DataGrid\Column\Action\Confirmation\StringConfirmation;
use Ublaboo\DataGrid\DataGrid;

class PartnersPresenter extends BasePresenter
{
    public function __construct(
        private readonly PartnersManager $partners,
        private readonly PartnerLogoStorage $storage
    ) {
        parent::__construct();
    }


    public function renderPartner(?int $id): void
    {
        $partner = $id !== null ? $this->partners->getPartnerById($id) : null;

        /** @var Form $form */
        $form = $this['partnerForm'];

        if ($partner) {
            $form->setDefaults($partner);
        }
    }


    public function renderGroup(?int $id ): void
    {
        $group = $id !== null ? $this->partners->getGroupById($id) : null;

        /** @var Form $form */
        $form = $this['groupForm'];

        if ($group) {
            $form->setDefaults($group);
        }
    }


    public function renderDefault(): void
    {
    }


    public function createComponentPartnerForm(): Form
    {
        $form = new Form();
        $form->addHidden('id');
        $form->addSelect('group_id', 'Skupina', $this->partners->getGroups(false)->fetchPairs('id', 'name'));
        $form->addText('name', 'Název')
            ->setOption('description', 'U obrázku jako titulek, bez obrázku jako HTML');
        $form->addText('url', 'URL')
            ->setRequired(false)
            ->addRule(Form::URL);
        $form->addUpload('picture', 'Obrázek')
            ->getControlPrototype()->addAttributes(['accept' => 'image/*'])
            ->setOption('description', 'Pokud při úpravě chcete obrázek ponechat původní, nevyplňujte');
        $form->addCheckbox('keep_picture', 'Ponechat obrázek')
            ->setDefaultValue(true)
            ->setOption('description', 'Zaškrtnutím se obrázek ponechá nebo uloží; zrušením zaškrtnutí se smaže');
        $form->addInteger('height', 'Výška obrázku')->setDefaultValue(100);
        $form->addCheckbox('enabled', 'Viditelný')
            ->setDefaultValue(true);
        $form->addSubmit('submit', 'Uložit');

        $form->addProtection();

        $form->onSuccess[] = $this->onPartnerFormSuccess(...);

        return $form;
    }


    public function onPartnerFormSuccess(Form $form, ArrayHash $values): never
    {
        $id = $values->id ?: null;

        if ($values->picture instanceof FileUpload && $values->picture->isImage()) {
            $values->picture_url = $this->storage->saveUploaded($values->picture, $values->name);
        } elseif ($values->keep_picture === false) {
            $values->picture_url = null;
        }

        unset($values->id);
        unset($values->picture);
        unset($values->keep_picture);

        $this->partners->insertUpdatePartner($values, $id);

        $this->flashMessage("Uloženo", 'success');
        $this->redirect('default');
    }


    public function createComponentPartnersDatagrid(): DataGrid
    {
        DataGrid::$iconPrefix = 'glyphicon glyphicon-';

        $grid = new DataGrid();

        $grid->addToolbarButton('partner', 'Nový partner')
            ->setClass('btn btn-xs btn-primary')
            ->setIcon('plus');

        $grid->setDataSource($this->partners->getPartners(false));

        $grid->setSortable(true);
        $grid->setSortableHandler('sortPartner!');

        $grid->addColumnLink('name', 'Jméno', 'partner');

        $groups = $this->partners->getGroups(false)->fetchPairs('id', 'name');
        $grid->addColumnText('group', 'Skupina')
            ->setRenderer(fn($item) => $groups[$item->group_id]);

        $grid->addColumnText('url', 'Odkaz')
            ->setRenderer(fn($item): string => $item->url ? 'Ano' : 'Ne');

        $grid->addColumnText('picture', 'Obrázek')
            ->setRenderer(fn($item): string => $item->picture_url ? 'Ano' : 'Ne');

        $grid->addColumnText('visible', 'Zobrazen')
            ->setRenderer(fn($item): string => $item->enabled ? 'Ano' : 'Ne');

        $grid->addAction('partner', '')
            ->setIcon('pencil')
            ->setTitle('Upravit');

        $grid->addAction('delete', '', 'deletePartner!')
            ->setIcon('trash')
            ->setTitle('Smazat')
            ->setClass('btn btn-xs btn-danger ajax')
            ->setConfirmation(new StringConfirmation('Opravdu chcete smazat partnera %s?', 'name'));

        return $grid;
    }


    /** @secured */
    public function handleSortPartner(int $item_id, ?int $prev_id = null, ?int $next_id = null): void
    {
        $item = $this->partners->getPartnerById($item_id);
        $prevItem = $prev_id ? $this->partners->getPartnerById($prev_id) : null;
        $nextItem = $next_id ? $this->partners->getPartnerById($next_id) : null;

        $this->partners->changePartnersOrder($item, $prevItem, $nextItem);

        $this->flashMessage("Partner " . $item->name . " byl přesunut", 'success');

        if ($this->isAjax()) {
            $this->redrawControl('flashes');
            $this['partnersDatagrid']->reload();
        } else {
            $this->redirect('this');
        }
    }


    /** @secured */
    public function handleDeletePartner(int $id): void
    {
        $partner = $this->partners->getPartnerById($id);

        $name = $partner->name;

        $this->partners->delete($partner);
        $this->flashMessage("Partner \"$name\" smazán", 'success');

        if ($this->isAjax()) {
            $this->redrawControl('flashes');
            $this['partnersDatagrid']->reload();
        } else {
            $this->redirect('this');
        }
    }


    public function createComponentGroupForm(): Form
    {
        $form = new Form();
        $form->addHidden('id');
        $form->addText('name', 'Název')
            ->setOption('description', 'Povolené HTML');
        $form->addInteger('height', 'Výchozí výška obrázku')->setDefaultValue(null);
        $form->addCheckbox('enabled', 'Viditelný')
            ->setDefaultValue(true);
        $form->addSubmit('submit', 'Uložit');

        $form->addProtection();

        $form->onSuccess[] = $this->onGroupFormSuccess(...);

        return $form;
    }


    public function onGroupFormSuccess(Form $form, ArrayHash $values): never
    {
        $id = $values->id ?: null;

        unset($values->id);

        $this->partners->insertUpdateGroup($values, $id);

        $this->flashMessage("Uloženo", 'success');
        $this->redirect('default');
    }


    public function createComponentGroupsDatagrid(): DataGrid
    {
        DataGrid::$iconPrefix = 'glyphicon glyphicon-';

        $grid = new DataGrid();

        $grid->addToolbarButton('group', 'Nová skupina')
            ->setClass('btn btn-xs btn-primary')
            ->setIcon('plus');

        $grid->setDataSource($this->partners->getGroups(false));

        $grid->setSortable(true);
        $grid->setSortableHandler('sortGroup!');

        $grid->addColumnLink('name', 'Jméno', 'group');

        $grid->addColumnText('visible', 'Zobrazen')
            ->setRenderer(fn($item): string => $item->enabled ? 'Ano' : 'Ne');

        $grid->addAction('group', '')
            ->setIcon('pencil')
            ->setTitle('Upravit');

        $grid->addAction('delete', '', 'deleteGroup!')
            ->setIcon('trash')
            ->setTitle('Smazat')
            ->setClass('btn btn-xs btn-danger ajax')
            ->setConfirmation(new StringConfirmation('Opravdu chcete smazat z skupinu %s?', 'name'));

        return $grid;
    }


    /** @secured */
    public function handleSortGroup(int $item_id, ?int $prev_id = null, ?int $next_id = null): void
    {
        $item = $this->partners->getGroupById($item_id);
        $prevItem = $prev_id ? $this->partners->getGroupById($prev_id) : null;
        $nextItem = $next_id ? $this->partners->getGroupById($next_id) : null;

        $this->partners->changeGroupsOrder($item, $prevItem, $nextItem);

        $this->flashMessage("Skupina " . $item->name . " byla přesunuta", 'success');

        if ($this->isAjax()) {
            $this->redrawControl('flashes');
            $this['groupsDatagrid']->reload();
        } else {
            $this->redirect('this');
        }
    }


    /** @secured */
    public function handleDeleteGroup(int $id): void
    {
        $group = $this->partners->getGroupById($id);

        $name = $group->name;

        try {
            $this->partners->delete($group);
            $this->flashMessage("Skupina \"$name\" smazána", 'success');
        } catch (ForeignKeyConstraintViolationException) {
            $this->flashMessage("Nelze smazat skupinu, ve které je nějaký partner", 'danger');
        }

        if ($this->isAjax()) {
            $this->redrawControl('flashes');
            $this['groupsDatagrid']->reload();
        } else {
            $this->redirect('this');
        }
    }
}
