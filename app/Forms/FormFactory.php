<?php

namespace App\Forms;

use Nette;
use Nette\Application\UI\Form;

class FormFactory
{
    use Nette\SmartObject;

    /**
     * @return Form
     */
    public function create(): \Nette\Application\UI\Form
    {
        $form = new Form;
        return $form;
    }
}
