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

        $form->addText('extendedCompany', 'Čím se živíš?')
            ->setOption('description', 'Dobrovolné - bude uvedeno na visačce. Například: Programátor v Redbit s.r.o.')
        ;

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
            } catch (JsonException) {
                // void
            }
            $form->setDefaults($values);
        }

        return $form;
    }
}
