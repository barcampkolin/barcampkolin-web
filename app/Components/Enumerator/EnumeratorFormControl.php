<?php

namespace App\Components\Enumerator;

use App\Model\EnumeratorManager;
use Kdyby\Replicator;
use Nette\Application\UI\Control;
use Nette\Application\UI\Form;
use Nette\Application\UI\Presenter;
use Nette\ComponentModel\IComponent;
use Nette\Forms\Container;
use Nette\Forms\Controls\SubmitButton;
use Nette\Utils\ArrayHash;
use Nette\Application\UI;

class EnumeratorFormControl extends Control
{
    /**
     * @param string $setName Name set name (in database)
     */
    public function __construct(
        private string $setName,
        private readonly EnumeratorManager $enumeratorManager
    ) {

        $this->monitor(UI\Presenter::class, $this->init(...));
    }


    protected function init(IComponent $presenter): void
    {
        if ($presenter instanceof Presenter) {
            /** @var Form $form */
            $form = $this['form'];
            if (!$form->isSubmitted()) {
                $enums = $this->enumeratorManager->get($this->setName);

                foreach ($enums as $i => $enum) {
                    $form['enums'][$i]->setDefaults($enum);
                }
            }
        }
    }


    public function render(): void
    {
        $this->template->setFile(__DIR__ . '/EnumeratorForm.latte');
        $this->template->enum = $this->enumeratorManager->get($this->setName);
        $this->template->render();
    }


    public function createComponentForm(): Form
    {
        $form = new Form();

        // Hidden submit button placed first in DOM to catch Enter key presses,
        // preventing accidental triggering of remove/add buttons.
        // original fix in 1c542a98a9768445c95e96616342edad74088094
        $form->addSubmit('defaultSubmit', '')
            ->setOmitted()
            ->setOption('rendered', true);

        $removeEvent = $this->removeClicked(...);

        // addDynamic() is provided by kdyby/forms-replicator at runtime via container macro
        /** @var Replicator\Container $enums */
        $enums = $form->addDynamic('enums', function (Container $enums) use ($removeEvent): void { // @phpstan-ignore method.notFound
            $enums->addText('key', 'Klíč', 30);
            $enums->addText('value', 'Hodnota', 50);

            $enums->addSubmit('remove', '╳ Odstranit')
                ->setValidationScope(null)
                ->onClick[] = $removeEvent;
        }, 1);

        $enums->addSubmit('add', '➕ Přidat další otázku')
            ->setValidationScope(null)
            ->onClick[] = $this->addClicked(...);


        $form->addSubmit('submit', 'Uložit')->setHtmlAttribute('class', 'btn-primary');
        $form->addProtection('Prosím, odešlete tento formulář ještě jednou (bezpečnostní kontrola)');
        $form->onSuccess[] = $this->onFormSuccess(...);
        return $form;
    }


    public function onFormSuccess(Form $form, ArrayHash $values): void
    {
        /** @var SubmitButton $submit */
        $submit = $form['submit'];
        /** @var SubmitButton $defaultSubmit */
        $defaultSubmit = $form['defaultSubmit'];
        if ($submit->isSubmittedBy() === false && $defaultSubmit->isSubmittedBy() === false) {
            return;
        }

        /** @var Replicator\Container $enumsContainer */
        $enumsContainer = $form['enums'];
        $enums = [];
        foreach ($enumsContainer->values as $enum) {
            if (empty($enum['key']) || empty($enum['value'])) {
                continue;
            }
            $enums[] = $enum;
        }
        $this->enumeratorManager->set($this->setName, $enums);

        $this->flashMessage('Nastavení uloženo', 'success');
        $this->redirect('this');
    }


    public function addClicked(SubmitButton $button): void
    {
        /** @var Replicator\Container $enums */
        $enums = $button->parent;
        $enums->createOne();
    }


    public function removeClicked(SubmitButton $button): void
    {
        /** @var Container $container */
        $container = $button->parent;
        /** @var Replicator\Container $enums */
        $enums = $container->parent;
        $enums->remove($container, true);
    }
}
