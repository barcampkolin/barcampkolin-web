<?php

namespace App\ApiModule\Presenters;

use App\Model\DateProvider;
use App\Model\ScheduleManager;
use JetBrains\PhpStorm\NoReturn;

class SchedulePresenter extends BasePresenter
{
    public function __construct(
        private readonly ScheduleManager $scheduleManager,
        private readonly DateProvider $dateProvider,
    ) {
        parent::__construct();
    }


    #[NoReturn]
    public function actionStepNext(): void
    {
        $steps = $this->scheduleManager->getSteps(true);

        foreach ($steps as $step) {
            if ($step['isNext']) {
                $configs = $this->getStepConfigs($step);
                if ($configs['auto'] !== true) {
                    $this->sendSuceessResponse(null, 'Nothing to do, automatic step is disabled on step.');
                } elseif ($this->dateProvider->isPassed($this->dateProvider->strToDate($configs['date']), true)) {
                    $this->scheduleManager->changeCurrentStep($step['key']);
                    $this->sendSuceessResponse($step, "Move schedule to step '{$step['key']}' is done.");
                } else {
                    $this->sendSuceessResponse(null, 'Nothing to do, time not mature yet.');
                }
            }
        }

        $this->sendSuceessResponse(null, 'Nothing to do, no next step available.');
    }


    private function getStepConfigs(array $step): array
    {
        $configs = [];

        foreach ($step['config'] as $config) {
            $configs[$config['key']] = $config['value'];
        }

        return $configs;
    }
}
