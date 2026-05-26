<?php

namespace App\Components\Program;

interface IProgramControlFactory
{
    public function create(): ProgramControl;
}
