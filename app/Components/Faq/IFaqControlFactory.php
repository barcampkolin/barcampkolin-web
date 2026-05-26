<?php

namespace App\Components\Faq;

interface IFaqControlFactory
{
    public function create(): FaqControl;
}
