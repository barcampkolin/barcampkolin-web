<?php

namespace App\Model;

use App\Model\EventInfoProvider as Event;
use Nette\Utils\DateTime;

class ScheduleManager
{
    const NOFLAG = 0;
    const REQUIRED = 1;

    const IDX_KEY = 0;
    const IDX_TYPE = 1;
    const IDX_NAME = 2;
    const IDX_FLAGS = 3;
    const IDX_ENUM = 4;

    private array $steps = [
        ['talks', 'Registrace přednášek'],
        ['vote', 'Hlasování o přednáškách'],
        ['program', 'Zveřejnění programu'],
        ['event', 'Barcamp'],
        ['report', 'Výstup (videa)']
    ];

    private array $featureConfigs = [
        [Event::FEATURE_CONFEREE, 'bool', 'Povolit registraci účastníků'],
        [Event::FEATURE_TALK, 'bool', 'Povolit zapisování přednášek'],
        [Event::FEATURE_TALK_EDIT, 'bool', 'Povolit editace zapsaných přednášek'],
        [Event::FEATURE_VOTE, 'bool', 'Povolit hlasování přednášek'],
        [Event::FEATURE_SHOW_VOTE, 'bool', 'Povolit zobrazení hlasů'],
        [
            Event::FEATURE_TALK_ORDER,
            'select',
            'Přednášky',
            self::NOFLAG,
            [
                '' => 'řazené podle přihlášení',
                'random' => 'řazené náhodně',
                'vote' => 'řazené podle hlasů',
            ]
        ],
        [Event::FEATURE_PROGRAM, 'bool', 'Zobrazit program přednášek'],
        [Event::FEATURE_REPORT, 'bool', 'Zobrazit výstupy (YouTube/Reporty)'],
    ];

    private array $singleStepConfigs = [
        [Event::SCHEDULE_VISUAL_DATE_BEGIN, 'datetime-local', 'Začátek', self::REQUIRED],
        [Event::SCHEDULE_VISUAL_DATE_END, 'datetime-local', 'Konec', self::REQUIRED],
    ];

    /**
     * Configuration for each steps
     * INCOMPLETE (only sub-set); completed in contructor
     */
    private array $stepConfigs = [
        ['auto', 'bool', 'Povolit automatické spuštění v daný čas'],
        ['date', 'datetime-local', 'Začátek', self::REQUIRED],
    ];


    /**
     * ScheduleManager constructor.
     * @param ConfigManager $configManager
     */
    public function __construct(
        private readonly ConfigManager $configManager
    ) {
        //Merge config subsets
        $this->stepConfigs = array_merge($this->stepConfigs, $this->featureConfigs);
    }


    /**
     * @param $stepKey
     * @throws \Nette\Utils\JsonException
     */
    public function changeCurrentStep($stepKey): void
    {
        $this->validateStepKey($stepKey);

        $this->setCurrentStep($stepKey);

        $this->propagateConfigsByStep($stepKey);

        $this->updateVisualDates();
    }


    /**
     * @param $stepKey
     * @return bool
     */
    public function validateStepKey($stepKey): bool
    {
        if (is_null($stepKey)) {
            return true;
        }

        foreach ($this->steps as $step) {
            if ($stepKey === $step[0]) {
                return true;
            }
        }

        $stepKey = (string)$stepKey;
        throw new \InvalidArgumentException("Step key '$stepKey' is invalid.");
    }


    /**
     * @param string $value
     * @throws \Nette\Utils\JsonException
     */
    public function setCurrentStep($value): void
    {
        $this->configManager->set('schedule.currentStep', $value);
    }


    /**
     * @param $stepKey
     * @throws \Nette\Utils\JsonException
     */
    private function propagateConfigsByStep($stepKey): void
    {
        if (is_null($stepKey)) {
            return;
        }

        $steps = $this->getSteps(true);

        $currentStep = null;
        foreach ($steps as $step) {
            if ($step['key'] === $stepKey) {
                $currentStep = $step;
                break;
            }
        }

        foreach ($this->featureConfigs as $config) {
            foreach ($currentStep['config'] as $stepConfig) {
                if ($config[self::IDX_KEY] === $stepConfig['key']) {
                    $this->configManager->set($stepConfig['key'], $stepConfig['value']);
                }
            }
        }
    }


    /**
     * @param bool $withValues
     * @param bool $withConfig
     * @return array
     * @throws \Nette\Utils\JsonException
     */
    public function getSteps($withValues = false, $withConfig = true): array
    {
        $currentStepIndex = $this->getCurrentStepIndex();

        $steps = [];
        foreach ($this->steps as $stepIndex => $step) {
            $stepInfo = [
                'index' => $stepIndex,
                'key' => $step[0],
                'name' => $step[1],
                'isDone' => is_null($currentStepIndex) ? false : $stepIndex < $currentStepIndex,
                'isCurrent' => $currentStepIndex === $stepIndex,
                'isNext' => $stepIndex - 1 === (is_null($currentStepIndex) ? -1 : $currentStepIndex)
            ];

            if ($withConfig) {
                $confs = [];
                foreach ($this->stepConfigs as $stepConfig) {
                    $conf = [
                        'id' => $this->getConfigKey($step[0], $stepConfig[self::IDX_KEY]),
                        'key' => $stepConfig[self::IDX_KEY],
                        'type' => $stepConfig[self::IDX_TYPE],
                        'name' => $stepConfig[self::IDX_NAME],
                        'enum' => $stepConfig[self::IDX_ENUM] ?? null,
                        'isRequired' => isset($stepConfig[self::IDX_FLAGS]) ? ($stepConfig[self::IDX_FLAGS] & self::REQUIRED) !== 0 : false,
                    ];
                    if ($withValues) {
                        $conf['value'] = $this->getConfig($step[0], $stepConfig[self::IDX_KEY]);
                    }
                    $confs[] = $conf;
                }
                $stepInfo['config'] = $confs;
            }

            $steps[] = $stepInfo;
        }
        return $steps;
    }


    /**
     * @return int|null
     * @throws \Nette\Utils\JsonException
     */
    public function getCurrentStepIndex(): int|string|null
    {
        $currentStepName = $this->getCurrentStepKey();
        foreach ($this->steps as $stepIndex => $step) {
            if ($step[0] === $currentStepName) {
                return $stepIndex;
            }
        }

        return null;
    }


    /**
     * @return mixed
     * @throws \Nette\Utils\JsonException
     */
    public function getCurrentStepKey()
    {
        return $this->configManager->get('schedule.currentStep');
    }


    /**
     * @param string $stepName
     * @param string $configName
     * @return string
     */
    private function getConfigKey($stepName, $configName): string
    {
        return sprintf("schedule.%s.%s", $stepName, $configName);
    }


    /**
     * @param string $stepName
     * @param string $configName
     * @param string $type
     * @return bool|mixed|null|string
     * @throws \Nette\Utils\JsonException
     */
    public function getConfig($stepName, $configName, $type = null)
    {
        $value = $this->configManager->get($this->getConfigKey($stepName, $configName));

        if ($type) {
            $value = $this->strictType($value, $type);
        }

        return $value;
    }


    /**
     * @param mixed $value
     * @param string $type
     * @return bool|null|string
     */
    private function strictType($value, $type)
    {
        if (is_null($value)) {
            return null;
        }

        return match ($type) {
            'bool' => (bool)$value,
            'select' => $value,
            'datetime', 'datetime-local' => (new DateTime($value))->format('c'),
            default => throw new \LogicException("Invalid form field type: $type"),
        };
    }


    /**
     * @param bool $withValues
     * @throws \Nette\Utils\JsonException
     */
    public function getCurrentStepConfigs($withValues = false): void
    {
        $step = $this->getCurrentStepKey();

        $configSet = array_merge($this->featureConfigs, $this->singleStepConfigs);

        $confs = [];

        foreach ($configSet as $configItem) {
            $conf = [
                'id' => $this->getConfigKey($step, $configItem[self::IDX_KEY]),
                'key' => $configItem[self::IDX_KEY],
                'type' => $configItem[self::IDX_TYPE],
                'name' => $configItem[self::IDX_NAME],
                'enum' => $configItem[self::IDX_ENUM] ?? null,
                'isRequired' => isset($configItem[self::IDX_FLAGS]) ? ($configItem[self::IDX_FLAGS] | self::REQUIRED) !== 0 : false,
            ];
            if ($withValues) {
                $conf['value'] = $this->getConfig($step, $configItem[self::IDX_KEY]);
            }
            $confs[] = $conf;
        }
    }


    /**
     * @param string $stepName
     * @param string $configName
     * @param mixed $value
     * @param string $type
     * @throws \Nette\Utils\JsonException
     */
    public function setConfig($stepName, $configName, $value, $type = null): void
    {
        if ($type) {
            $value = $this->strictType($value, $type);
        }

        $this->configManager->set($this->getConfigKey($stepName, $configName), $value);
    }


    /**
     * @throws \Nette\Utils\JsonException
     */
    private function updateVisualDates(): void
    {
        $steps = $this->getSteps(true);

        foreach ($steps as $step) {
            if ($step['isNext']) {
                foreach ($step['config'] as $config) {
                    if ($config['key'] === 'date' && $config['value']) {
                        $begin = $this->strictType('now', 'datetime');
                        $this->configManager->set(Event::SCHEDULE_VISUAL_DATE_BEGIN, $begin);
                        $end = $this->strictType($config['value'], 'datetime');
                        $this->configManager->set(Event::SCHEDULE_VISUAL_DATE_END, $end);
                    }
                }
            }
        }
    }
}
