<?php

namespace App\AdminModule\Presenters;

use App\Model\PartnerLogoStorage;
use App\Model\PartnersManager;
use Nette\Application\UI\Form;
use Nette\Utils\ArrayHash;

/**
 * Class PartnersPresenter
 * @package App\AdminModule\Presenters
 */
class PartnersPresenter extends BasePresenter
{
    /**
     * @var PartnersManager
     */
    private $partners;
    /**
     * @var PartnerLogoStorage
     */
    private $storage;


    /**
     * PartnersPresenter constructor.
     * @param PartnersManager $partners
     */
    public function __construct(PartnersManager $partners, PartnerLogoStorage $storage)
    {
        $this->partners = $partners;
        $this->storage = $storage;
    }


    /**
     * @param null $id
     * @throws \Nette\Application\BadRequestException
     */
    public function renderPartner($id = null)
    {

        $partner = $this->partners->getPartnerById($id);
        if ($id && !$partner) {
            $this->error("Partner not found");
        }

        /** @var Form $form */
        $form = $this['partnerForm'];

        if ($partner) {
            $form->setDefaults($partner);
        }
    }


    /**
     * @param null $id
     * @throws \Nette\Application\BadRequestException
     */
    public function renderGroup($id = null)
    {

        $group = $this->partners->getGroupById($id);
        if ($id && !$group) {
            $this->error("Group not found");
        }

        /** @var Form $form */
        $form = $this['groupForm'];

        if ($group) {
            $form->setDefaults($group);
        }
    }


    /**
     *
     */
    public function renderDefault()
    {
        $report = $this->partners->getReport(false);

        $this->template->report = $report;
    }


    /**
     * @return Form
     */
    public function createComponentPartnerForm()
    {
        $form = new Form();
        $form->addHidden('id');
        $form->addSelect('group_id', 'Skupina', $this->partners->getGroups(false)->fetchPairs('id', 'name'));
        $form->addText('name', 'Název')
            ->setOption('description', 'U obrázku jako titulek, bez obrázku jako HTML');
        $form->addText('url', 'URL')
            ->setRequired(false)
            ->addRule(Form::URL);
//        $form->addCheckbox('is_picture', 'Obrázek')
//            ->setDefaultValue(true)
//            ->setOption('description', 'Zaškrtnutím se obrázek uloží, zrušením zaškrtnutí se smaže');
        $form->addText('picture_url', 'URL obrázku')
            ->setRequired(false)
            ->addRule(Form::URL);
        $form->addInteger('height', 'Výška obrázku')->setDefaultValue(100);
        $form->addInteger('order', 'Pořadí');
        $form->addCheckbox('enabled', 'Viditelný')
            ->setDefaultValue(true);
        $form->addSubmit('submit', 'Uložit');

        $form->addProtection();

        $form->onSuccess[] = [$this, 'onPartnerFormSuccess'];

        return $form;
    }


    /**
     * @param Form $form
     * @param ArrayHash $values
     * @throws \Nette\Application\AbortException
     */
    public function onPartnerFormSuccess(Form $form, ArrayHash $values)
    {
        $id = $values->id ?: null;

        unset($values->id);

        $this->partners->insertUpdatePartner($values, $id);

        $this->flashMessage("Uloženo", 'success');
        $this->redirect('default');
    }


    /**
     * @return Form
     */
    public function createComponentGroupForm()
    {
        $form = new Form();
        $form->addHidden('id');
        $form->addText('name', 'Název')
            ->setOption('description', 'Povolené HTML');
        $form->addInteger('height', 'Výchozí výška obrázku')->setDefaultValue(null);
        $form->addInteger('order', 'Pořadí');
        $form->addCheckbox('enabled', 'Viditelný')
            ->setDefaultValue(true);
        $form->addSubmit('submit', 'Uložit');

        $form->addProtection();

        $form->onSuccess[] = [$this, 'onGroupFormSuccess'];

        return $form;
    }


    /**
     * @param Form $form
     * @param ArrayHash $values
     * @throws \Nette\Application\AbortException
     */
    public function onGroupFormSuccess(Form $form, ArrayHash $values)
    {
        $id = $values->id ?: null;

        unset($values->id);

        $this->partners->insertUpdateGroup($values, $id);

        $this->flashMessage("Uloženo", 'success');
        $this->redirect('default');
    }
}
