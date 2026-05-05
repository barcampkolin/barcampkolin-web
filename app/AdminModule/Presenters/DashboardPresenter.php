<?php

namespace App\AdminModule\Presenters;

use App\Components\Enumerator\IEnumeratorFormControlFactory;
use App\Model\ConfigManager;
use App\Model\DateProvider;
use App\Model\EnumeratorManager;
use App\Model\EventInfoProvider as Event;
use App\Model\ScheduleManager;
use JetBrains\PhpStorm\NoReturn;
use Nette\Application\UI\Form;
use Nette\Forms\Form as BaseForm;
use Nette\Utils\ArrayHash;

class DashboardPresenter extends BasePresenter
{

    private const NOFLAG = 0;
    private const REQUIRED = 1;

    private array $simpleConfigs = [
        Event::COUNTS_CONFEREE => [
            'int',
            'Počet účastníků',
            self::REQUIRED,
            'Pozor, zobrazuje se na úvodní stránce'
        ],

        Event::COUNTS_TALKS => [
            'int',
            'Počet přednášek (prezentační počet)',
            self::REQUIRED,
            'Pozor, zobrazuje se na úvodní stránce'
        ],
        Event::COUNTS_TALKS_LIMIT => [
            'int',
            'Počet přednášek (skutečný limit)',
            self::REQUIRED,
            'V seznamu přednášek zobrazuje čáru, jsou-li přednášky řazeny podle hlasů. Nastavte 0 pro vypnutí.'
        ],
        Event::COUNTS_WORKSHOPS => [
            'int',
            'Počet workshopů',
            self::REQUIRED,
            'Pozor, zobrazuje se na úvodní stránce'
        ],
        Event::COUNTS_HALLS => [
            'int',
            'Počet sálů',
            self::REQUIRED,
            'Pozor, zobrazuje se na úvodní stránce'
        ],
        Event::COUNTS_WARMUPPARTY => [
            'int',
            'Počet warm-up párty',
            self::REQUIRED,
            'Pozor, zobrazuje se na úvodní stránce'
        ],
        Event::COUNTS_AFTERPARTY => [
            'int',
            'Počet afterpárty',
            self::REQUIRED,
            'Pozor, zobrazuje se na úvodní stránce'
        ],
        Event::URL_FACEBOOK => ['url', 'URL profilu na Facebook'],
        Event::URL_TWITTER => ['url', 'URL profilu na Twitter'],
        Event::URL_YOUTUBE => ['url', 'URL profilu na YouTube'],
        Event::URL_INSTAGRAM => ['url', 'URL profilu na Instagram'],
        Event::URL_WAY_TO_EVENT => ['url', 'URL na článek Jak se k nám dostanete'],
        Event::URL_OG_IMAGE => ['url', 'URL na OG image', self::NOFLAG, 'Při nevyplnění se použije systémové logo'],
        Event::URL_PARTNER_PROPOSAL => ['url', 'URL na Informace pro partnery (PDF)'],
    ];

    private array $featureConfigs = [
        Event::FEATURE_CONFEREE => ['bool', 'Povolit registraci účastníků'],
        Event::FEATURE_TALK => ['bool', 'Povolit zapisování přednášek'],
        Event::FEATURE_TALK_EDIT => ['bool', 'Povolit editace zapsaných přednášek'],
        Event::FEATURE_VOTE => ['bool', 'Povolit hlasování přednášek'],
        Event::FEATURE_SHOW_VOTE => ['bool', 'Povolit zobrazení hlasů'],
        Event::FEATURE_TALK_ORDER => [
            'select',
            'Přednášky',
            self::NOFLAG,
            null,
            [
                '' => 'Řazené podle přihlášení',
                'random' => 'Řazené náhodně',
                'vote' => 'Řazené podle hlasů',
            ]
        ],
        Event::FEATURE_PROGRAM => ['bool', 'Zobrazit program přednášek'],
        Event::FEATURE_REPORT => ['bool', 'Zobrazit výstupy (YouTube/Reporty)'],
    ];

    private array $visualDates = [
        Event::SCHEDULE_VISUAL_DATE_BEGIN => 'Začátek',
        Event::SCHEDULE_VISUAL_DATE_END => 'Konec'
    ];


    public function __construct(
        private readonly ConfigManager $configManager,
        private readonly ScheduleManager $scheduleManager,
        private readonly IEnumeratorFormControlFactory $enumeratorFormControlFactory,
        private readonly DateProvider $dateProvider,
    ) {
        parent::__construct();
    }


    public function actionEnums(): void
    {
        $this['faq'] = $this->enumeratorFormControlFactory->create(EnumeratorManager::SET_FAQS);
        $this['categories'] = $this->enumeratorFormControlFactory->create(EnumeratorManager::SET_TALK_CATEGORIES);
        $this['durations'] = $this->enumeratorFormControlFactory->create(EnumeratorManager::SET_TALK_DURATIONS);
        $this['rooms'] = $this->enumeratorFormControlFactory->create(EnumeratorManager::SET_TALK_ROOMS);
    }


    public function renderSchedule(): void
    {
        $steps = $this->scheduleManager->getSteps();
        $currentStepIndex = $this->scheduleManager->getCurrentStepIndex();

        $this->template->currentStepIndex = $currentStepIndex;
        $this->template->steps = $steps;
    }


    /** @secured */
    #[NoReturn]
    public function handleScheduleStepActivate(?string $step): void
    {
        $this->scheduleManager->changeCurrentStep($step);

        $messageAppend = $step ? 'Web byl nastaven podle nastavení kroku.' : 'Natavení webu se nijak nezměnilo.';
        $this->flashMessage('Harmonogram byl úspěšně převeden do zvoleného kroku. ' . $messageAppend, 'success');
        $this->redirect('this');
    }


    public function createComponentConfigForm(): Form
    {
        $form = new Form();
        foreach ($this->simpleConfigs as $key => $data) {
            $formId = $this->ideable($key);
            $item = null;
            $isRequired = isset($data[2]) && ($data[2] & self::REQUIRED);
            switch ($data[0]) {
                case 'text':
                    $item = $form->addText($formId, $data[1])
                        ->setDefaultValue($this->configManager->get($key, ''));
                    break;
                case 'url':
                    $item = $form->addText($formId, $data[1])
                        ->setHtmlType($data[0])
                        ->setDefaultValue($this->configManager->get($key, ''));
                    $item->addCondition(BaseForm::Filled)
                        ->addRule(BaseForm::URL, 'Toto není platné URL');
                    break;
                case 'date':
                case 'time':
                case 'datetime-local':
                    $item = $form->addText($formId, $data[1])
                        ->setHtmlType($data[0])
                        ->setDefaultValue($this->configManager->get($key, ''));
                    break;
                case 'bool':
                    $item = $form->addCheckbox($formId, $data[1])
                        ->setDefaultValue($this->configManager->get($key, ''));
                    break;
                case 'int':
                    $item = $form->addInteger($formId, $data[1])
                        ->setDefaultValue($this->configManager->get($key, ''));
                    break;
                default:
                    throw new \LogicException('Unknown form item type reqested');
            }
            if ($isRequired) {
                $item->setRequired("Pole '$data[1]' musí být vyplněno.'");
            }
            if (isset($data[3])) {
                $item->setOption('description', $data[3]);
            }
        }
        $form->addSubmit('submit', 'Uložit');
        $form->addProtection('Prosím, odešlete tento formulář ještě jednou (bezpečnostní kontrola)');
        $form->onSuccess[] = $this->onConfigFormSuccess(...);
        return $form;
    }


    #[NoReturn]
    public function onConfigFormSuccess(Form $form, ArrayHash $values): void
    {
        foreach ($this->simpleConfigs as $key => $data) {
            $id = $this->ideable($key);
            if (isset($values[$id])) {
                $this->configManager->set($key, $values[$id]);
            }
        }

        $this->flashMessage('Nastavení uloženo', 'success');
        $this->redirect('this');
    }


    public function createComponentScheduleConfigForm(): Form
    {
        $form = new Form();

        $form->addGroup();
        foreach ($this->featureConfigs as $key => $data) {
            $formId = $this->ideable($key);
            $item = null;
            $isRequired = isset($data[2]) && ($data[2] & self::REQUIRED);
            $item = match ($data[0]) {
                'bool' => $form->addCheckbox($formId, $data[1])
                    ->setDefaultValue($this->configManager->get($key, '')),
                'select' => $form->addSelect($formId, $data[1], $data[4])
                    ->setDefaultValue($this->configManager->get($key, '')),
                default => throw new \LogicException('Unknown form item type reqested'),
            };
            if ($isRequired) {
                $item->setRequired("Pole '$data[1]' musí být vyplněno.'");
            }
            if (isset($data[3])) {
                $item->setOption('description', $data[3]);
            }
        }

        $form->addGroup('Vizuální zobrazení pokroku (pohyb kuličky)');

        foreach ($this->visualDates as $key => $name) {
            $form->addText($this->ideable($key), $name)
                ->setHtmlType('datetime-local')
                ->setDefaultValue($this->dateToHtml5($this->configManager->get($key)))
                ->getControlPrototype()->addAttributes(['step' => 1]);
        }

        $form->addGroup();

        $form->addSubmit('submit', 'Uložit');
        $form->addProtection('Prosím, odešlete tento formulář ještě jednou (bezpečnostní kontrola)');

        $form->onSuccess[] = $this->onScheduleConfigFormSuccess(...);

        return $form;
    }


    #[NoReturn]
    public function onScheduleConfigFormSuccess(Form $form, ArrayHash $values): void
    {
        $bothConfigs = array_merge($this->featureConfigs, $this->visualDates);

        foreach ($bothConfigs as $key => $data) {
            $id = $this->ideable($key);
            if (isset($values[$id])) {
                $this->configManager->set($key, $values[$id]);
            }
        }

        $this->flashMessage('Nastavení bylo upraveno a změny se hned projevily na webu', 'success');
        $this->redirect('this');
    }


    public function createComponentScheduleForm(): Form
    {
        $steps = $this->scheduleManager->getSteps(true);

        $form = new Form();

        foreach ($steps as $stepNum => $step) {
            $form->addGroup(sprintf('Krok č. %d: %s', $stepNum + 1, $step['name']));
            foreach ($step['config'] as $config) {
                $fomId = $this->ideable($config['id']);
                $item = match ($config['type']) {
                    'bool' => $form->addCheckbox($fomId, $config['name'])
                        ->setDefaultValue($config['value']),
                    'select' => $form->addSelect($fomId, $config['name'], $config['enum'])
                        ->setDefaultValue($config['value']),
                    'datetime-local' => $form->addText($fomId, $config['name'])
                        ->setHtmlType($config['type'])
                        ->setDefaultValue($config['value'] ? $this->dateToHtml5($config['value']) : null)
                        ->getControlPrototype()->addAttributes(['step' => 1]),
                    default => throw new \LogicException("Invalid form field type: $config[type]"),
                };
                if ($config['isRequired']) {
                    $item->setRequired("Pole '$config[name]' v sekci '$step[name]' je povinné, ale není vyplněno.'");
                }
            }
        }

        $form->addGroup();
        $form->addSubmit('submit', 'Uložit');
        $form->addProtection('Prosím, odešlete tento formulář ještě jednou (bezpečnostní kontrola)');
        $form->onSuccess[] = $this->onScheduleFormSuccess(...);
        return $form;
    }


    #[NoReturn]
    public function onScheduleFormSuccess(Form $form, ArrayHash $values): void
    {
        $steps = $this->scheduleManager->getSteps(false);

        foreach ($steps as $step) {
            foreach ($step['config'] as $config) {
                $formId = $this->ideable($config['id']);
                $value = $values[$formId];
                $this->scheduleManager->setConfig($step['key'], $config['key'], $value, $config['type']);
            }
        }
        $this->flashMessage('Nastavení uloženo', 'success');
        $this->redirect('this');
    }


    private function ideable(string $key): string
    {
        return str_replace('.', '', $key);
    }


    private function dateToHtml5($date): string
    {
        return $this->dateProvider->strToDate($date)->format('Y-m-d\TH:i:s');
    }
}
