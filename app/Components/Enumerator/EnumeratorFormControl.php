<?php

namespace App\Components\Enumerator;

use App\Model\EnumeratorManager;
use Kdyby\Replicator;
use Nette\Application\UI\Control;
use Nette\Application\UI\Form;
use Nette\Application\UI\Presenter;
use Nette\Forms\Container;
use Nette\Forms\Controls\SubmitButton;
use Nette\Utils\ArrayHash;
use Nette\Application\UI;

class EnumeratorFormControl extends Control
{
    /**
     * EnumeratorFormControl constructor.
     * @param string $setName Name set name (in database)
     * @param EnumeratorManager $enumeratorManager
     */
    public function __construct(
        private $setName,
        private readonly EnumeratorManager $enumeratorManager
    ) {

        $this->monitor(UI\Presenter::class, $this->init(...));
    }


    protected function init(\Nette\ComponentModel\IComponent $presenter): void
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


    /**
     * @throws \App\Model\InvalidEnumeratorSetException
     * @throws \Nette\Utils\JsonException
     */
    public function render(): void
    {
        $this->template->setFile(__DIR__ . '/EnumeratorForm.latte');
        $this->template->enum = $this->enumeratorManager->get($this->setName);
        $this->template->render();
    }


    /**
     * @return Form
     */
    public function createComponentForm(): \Nette\Application\UI\Form
    {
        $form = new Form();

        $removeEvent = $this->removeClicked(...);

        /** @var Replicator\Container $enums */
        $enums = $form->addDynamic('enums', function (Container $enums) use ($removeEvent): void {
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


    /**
     * @param Form $form
     * @param ArrayHash $values
     * @throws \App\Model\InvalidEnumeratorSetException
     * @throws \Nette\Application\AbortException
     * @throws \Nette\Utils\JsonException
     */
    public function onFormSuccess(Form $form, $values): void
    {
        if ($form['submit']->isSubmittedBy() === false) {
            return;
        }

        $enums = [];
        foreach ($form['enums']->values as $enum) {
            if (empty($enum['key']) || empty($enum['value'])) {
                continue;
            }
            $enums[] = $enum;
        }
        $this->enumeratorManager->set($this->setName, $enums);

        $this->flashMessage('Nastavení uloženo', 'success');
        $this->redirect('this');
    }


    /**
     * @param SubmitButton $button
     */
    public function addClicked(SubmitButton $button): void
    {
        /** @var Replicator\Container $enums */
        $enums = $button->parent;
        $enums->createOne();
    }


    /**
     * @param SubmitButton $button
     */
    public function removeClicked(SubmitButton $button): void
    {
        /** @var Container $container */
        $container = $button->parent;
        /** @var Replicator\Container $enums */
        $enums = $container->parent;
        $enums->remove($container, true);
    }


}
