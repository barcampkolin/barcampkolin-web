<?php

namespace App\Components\Schedule;

use App\Model\EventInfoProvider;
use App\Model\ScheduleManager;
use Nette\Application\UI\Control;

class ScheduleControl extends Control
{
    /**
     * ScheduleControl constructor.
     * @param EventInfoProvider $infoProvider
     * @param ScheduleManager $scheduleManager
     */
    public function __construct(
        private readonly EventInfoProvider $infoProvider,
        private readonly ScheduleManager $scheduleManager
    ) {
    }


    /**
     *
     * @throws \Nette\Utils\JsonException
     */
    public function render(): void
    {
        $dates = $this->infoProvider->getDates();
        $features = $this->infoProvider->getFeatures();
        $steps = $this->scheduleManager->getSteps(false, false);

        $this->template->setFile(__DIR__ . '/Schedule.latte');
        $this->template->features = $this->infoProvider->getFeatures();
        $this->template->dates = $dates;
        $this->template->urls = $this->infoProvider->getUrls();

        $this->template->config = [
            'dates' => $dates,
            'steps' => $steps,
            'features' => $features
        ];

        $this->template->render();
    }
}
