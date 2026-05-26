<?php

namespace App\ApiModule\Presenters;

use App\Model\ScheduleManager;
use Nette\Utils\DateTime;

class SchedulePresenter extends BasePresenter
{
    public function __construct(
        private readonly ScheduleManager $scheduleManager
    ) {
        parent::__construct();
    }


    public function actionStepNext(): void
    {
        $steps = $this->scheduleManager->getSteps(true);

        foreach ($steps as $step) {
            if ($step['isNext']) {
                $configs = $this->getStepConfigs($step);
                if ($configs['auto'] != true) {
                    $this->sendSuceessResponse(null, 'Nothing to do, automatic step is disabled on step.');
                } elseif ($this->isDatePassed($configs['date'], true)) {
                    $this->scheduleManager->changeCurrentStep($step['key']);
                    $this->sendSuceessResponse($step, "Move schedule to step '$step[key]' is done.");
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


    private function isDatePassed(string $dateString, bool $byMidnight = false): bool
    {
        $decisiveDate = new DateTime($dateString);
        $now = new DateTime();

        if ($byMidnight) {
            $decisiveDate->setTime(0, 0, 0);
        }

        return $decisiveDate <= $now;
    }
}
