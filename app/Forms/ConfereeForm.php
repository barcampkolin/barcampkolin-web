<?php

namespace App\Forms;

use App\Orm\Conferee\Conferee;
use Nette\Application\UI\Form;
use Nette\SmartObject;
use Nette\Utils\Json;
use Nette\Utils\JsonException;

class ConfereeForm
{
    use SmartObject;


    /**
     * RegisterConfereeForm constructor.
     * @param FormFactory $factory
     */
    public function __construct(
        private FormFactory $factory
    ) {
    }


    /**
     * @param callable $onSuccess
     * @param Conferee|null $conferee
     * @return Form
     */
    public function create(callable $onSuccess, Conferee $conferee = null)
    {
        $form = $this->factory->create();
        $form->addText('name', 'Jméno a příjmení:')
            ->setOption('description', 'Jméno bude zobrazeno v na webu s Vaším avatarem')
            ->setRequired('Prosíme, vyplňte svoje jméno');

        $form->addText('email', 'E-mail:')
            ->setOption('description', 'E-mail nikde nezobrazujeme, ale bude sloužit pro přihlášení a tak…')
            ->setRequired('Prosíme, vyplňte svůj e-mail');

        $form->addTextArea('bio', 'Řekni nám něco o sobě:')
            ->setOption(
                'description',
                'Pokud to vyplníte, zobrazíme to na webu u Vašeho jména. '
                . 'Formátování není dovoleno.'
            );

        $form->addGroup('Dotační dotazník');

        $form->addText('extendedCompany', 'Firma či organizace:')
            ->setOption('description', 'Odkud k nám přicházíte? (nepovinné, může se zobrazit na profilu a na visačce)');

        $form->addText('extendedCompanyPosition', 'Pozice ve firmě:')
            ->setOption(
                'description',
                'Jakou pozici máte ve firmě (nepovinné, může se zobrazit na profilu a na visačce)'
            );

        $form->addGroup();

        $form->addRadioList(
            'allowPublish',
            'Souhlasíš se zveřejněním těchto údajů na seznamu účastníků na webu?',
            [
                true => 'Ano',
                false => 'Ne'
            ]
        )->setDefaultValue(true)
            ->setOption(
                'description',
                'E-mail samozřejmě nebudeme zobrazovat, pouze tvoje jméno, avatar, firmu a pokud vyplníš pár slov o sobě, tak i ty.'
            );

        $form->addSubmit('send')
            ->setOption('itemClass', 'text-center')
            ->getControlPrototype()->setName('button')->setText('Odeslat');

        $form->addProtection('Prosím, odešlete formulář ještě jednou');

        $form->onSuccess[] = function (Form $form, $values) use ($conferee, $onSuccess): void {
            if ($conferee === null) {
                $conferee = new Conferee();
            }

            $conferee->name = $values->name;
            $conferee->email = $values->email;
            $conferee->bio = $values->bio;
            $conferee->allowPublish = (bool)$values->allowPublish;
            $conferee->extended = Json::encode(
                [
                    'company' => $values->extendedCompany,
                    'position' => $values->extendedCompanyPosition,
                ]
            );

            $onSuccess($conferee, $values);
        };

        if ($conferee) {
            $values = $conferee->toArray();
            $values['allowPublish'] = (int)$values['allowPublish'];

            try {
                $extended = Json::decode($conferee->extended, Json::FORCE_ARRAY);
                $values['extendedCompany'] = $extended['company'] ?? null;
                $values['extendedCompanyPosition'] = $extended['position'] ?? null;
            } catch (JsonException) {
                // void
            }
            $form->setDefaults($values);
        }

        return $form;
    }
}
