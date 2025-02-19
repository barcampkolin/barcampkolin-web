<?php

namespace App\Components\SignupButtons;

use App\Model\EventInfoProvider;
use Nette\Application\UI\Control;

class SignupButtonsControl extends Control
{
    public function __construct(private readonly EventInfoProvider $eventInfo)
    {
    }


    public function render(): void
    {
        $this->template->setFile(__DIR__ . '/SignupButtons.latte');
        $this->template->dates = $this->eventInfo->getDates();
        $this->template->features = $this->eventInfo->getFeatures();
        $this->template->render();
    }
}
