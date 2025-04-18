<?php

namespace App\ApiModule\Presenters;

use App\Model\ScheduleManager;
use Nette\Utils\DateTime;

class SchedulePresenter extends BasePresenter
{
    /**
     * SchedulePresenter constructor.
     * @param ScheduleManager $scheduleManager
     */
    public function __construct(
        private readonly ScheduleManager $scheduleManager
    ) {
        parent::__construct();
    }


    /**
     * @throws \Nette\Application\AbortException
     * @throws \Nette\Utils\JsonException
     */
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


    /**
     * @param array $step
     * @return array
     */
    private function getStepConfigs(array $step): array
    {
        $configs = [];

        foreach ($step['config'] as $config) {
            $configs[$config['key']] = $config['value'];
        }

        return $configs;
    }


    /**
     * @param string $dateString
     * @param bool $byMidnight
     * @return bool
     */
    private function isDatePassed($dateString, bool $byMidnight = false): bool
    {
        $decisiveDate = new DateTime($dateString);
        $now = new DateTime();

        if ($byMidnight) {
            $decisiveDate->setTime(0, 0, 0);
        }

        return $decisiveDate <= $now;
    }
}
