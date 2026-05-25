<?php

namespace App\Components\Schedule;

use App\Model\EventInfoProvider;
use App\Model\ScheduleManager;
use Nette\Application\UI\Control;

class ScheduleControl extends Control
{
    public function __construct(
        private readonly EventInfoProvider $infoProvider,
        private readonly ScheduleManager $scheduleManager
    ) {
    }


    public function render(): void
    {
        $dates = $this->infoProvider->getDates();
        $features = $this->infoProvider->getFeatures();
        $steps = $this->scheduleManager->getSteps(false, false);

        $template = $this->template;
        $template->setFile(__DIR__ . '/Schedule.latte');
        $template->addFilter(
            'json',
            fn($value): string => json_encode($value, JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
        );

        $template->features = $features;
        $template->dates = $dates;
        $template->steps = $steps;

        $template->urls = $this->infoProvider->getUrls();

        $template->config = [
            'dates' => $dates,
            'steps' => $steps,
            'features' => $features
        ];

        $template->render();
    }
}
