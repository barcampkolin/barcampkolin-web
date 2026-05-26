<?php

namespace App\Components\Partners;

interface IPartnersControlFactory
{
    public function create(): PartnersControl;
}
