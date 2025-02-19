<?php

namespace App\Components\SignupButtons;

use App\Model\EventInfoProvider;

class SignupButtonsFactory
{
    /**
     * SignupButtonsFactory constructor.
     * @param EventInfoProvider $eventInfoProvider
     */
    public function __construct(private readonly EventInfoProvider $eventInfoProvider)
    {
    }


    /**
     * @return SignupButtonsControl
     */
    public function create(): \App\Components\SignupButtons\SignupButtonsControl
    {
        return new SignupButtonsControl($this->eventInfoProvider);
    }
}
