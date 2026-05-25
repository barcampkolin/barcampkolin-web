<?php

namespace App\Components\SpeakerList;

interface ISpeakerListControlFactory
{
    public function create(): SpeakerListControl;
}
