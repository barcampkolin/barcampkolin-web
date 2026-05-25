<?php

namespace App\Components\SignupButtons;

use App\Model\EventInfoProvider;

readonly class SignupButtonsFactory
{
    public function __construct(
        private EventInfoProvider $eventInfoProvider
    ) {
    }


    public function create(): SignupButtonsControl
    {
        return new SignupButtonsControl($this->eventInfoProvider);
    }
}
