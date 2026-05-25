<?php

namespace App\Model;

use App\Model\EventInfoProvider as Event;
use Nette\Utils\DateTime;

class ScheduleManager
{
    private const int NOFLAG = 0;
    private const int REQUIRED = 1;

    private const int IDX_KEY = 0;
    private const int IDX_TYPE = 1;
    private const int IDX_NAME = 2;
    private const int IDX_FLAGS = 3;
    private const int IDX_ENUM = 4;

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


    public function __construct(
        private readonly ConfigManager $configManager
    ) {
        //Merge config subsets
        $this->stepConfigs = array_merge($this->stepConfigs, $this->featureConfigs);
    }


    public function changeCurrentStep(?string $stepKey): void
    {
        $this->validateStepKey($stepKey);

        $this->setCurrentStep($stepKey);

        $this->propagateConfigsByStep($stepKey);

        $this->updateVisualDates();
    }


    public function validateStepKey(?string $stepKey): bool
    {
        if (is_null($stepKey)) {
            return true;
        }

        foreach ($this->steps as $step) {
            if ($stepKey === $step[0]) {
                return true;
            }
        }

        throw new \InvalidArgumentException("Step key '$stepKey' is invalid.");
    }


    public function setCurrentStep(?string $value): void
    {
        $this->configManager->set(Event::SCHEDULE_CURRENT_STEP, $value);
    }


    private function propagateConfigsByStep(?string $stepKey): void
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


    public function getSteps(bool $withValues = false, bool $withConfig = true): array
    {
        $currentStepIndex = $this->getCurrentStepIndex();

        $steps = [];
        foreach ($this->steps as $stepIndex => $step) {
            $stepInfo = [
                'index' => $stepIndex,
                'key' => $step[0],
                'name' => $step[1],
                'isDone' => !is_null($currentStepIndex) && $stepIndex < $currentStepIndex,
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
                        'isRequired' => isset($stepConfig[self::IDX_FLAGS]) && ($stepConfig[self::IDX_FLAGS] & self::REQUIRED) !== 0,
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


    public function getCurrentStepIndex(): ?int
    {
        $currentStepName = $this->getCurrentStepKey();
        foreach ($this->steps as $stepIndex => $step) {
            if ($step[0] === $currentStepName) {
                return $stepIndex;
            }
        }

        return null;
    }


    public function getCurrentStepKey(): ?string
    {
        return $this->configManager->get(Event::SCHEDULE_CURRENT_STEP);
    }


    private function getConfigKey(string $stepName, string $configName): string
    {
        return sprintf("schedule.%s.%s", $stepName, $configName);
    }


    public function getConfig(string $stepName, string $configName, ?string $type = null)
    {
        $value = $this->configManager->get($this->getConfigKey($stepName, $configName));

        if ($type) {
            $value = $this->strictType($value, $type);
        }

        return $value;
    }


    private function strictType(mixed $value, string $type): bool|string|null
    {
        if (is_null($value)) {
            return null;
        }

        return match ($type) {
            'bool' => (bool)$value,
            'select' => $value,
            'datetime', 'datetime-local' => new DateTime($value)->format('c'),
            default => throw new \LogicException("Invalid form field type: $type"),
        };
    }


    public function setConfig(string $stepName, string $configName, mixed $value, ?string $type = null): void
    {
        if ($type) {
            $value = $this->strictType($value, $type);
        }

        $this->configManager->set($this->getConfigKey($stepName, $configName), $value);
    }


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
