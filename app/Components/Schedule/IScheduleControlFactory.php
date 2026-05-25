<?php

namespace App\Components\Schedule;

interface IScheduleControlFactory
{
    public function create(): ScheduleControl;
}
