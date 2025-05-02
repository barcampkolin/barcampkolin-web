<?php

namespace App\Presenters;

use App\Components\Faq\FaqControl;
use App\Components\Faq\IFaqControlFactory;
use App\Components\Newsletter\NewsletterSignupControl;
use App\Components\Newsletter\NewsletterSignupFactory;
use App\Components\Partners\IPartnersControlFactory;
use App\Components\Program\IProgramControlFactory;
use App\Components\Program\ProgramControl;
use App\Components\Schedule\IScheduleControlFactory;
use App\Components\Schedule\ScheduleControl;
use App\Components\SignupButtons\SignupButtonsControl;
use App\Components\SignupButtons\SignupButtonsFactory;
use App\Components\SpeakerList\ISpeakerListControlFactory;
use App\Components\SpeakerList\SpeakerListControl;
use App\Model\OrgListProvider;
use Nette\Utils\Html;

class HomepagePresenter extends BasePresenter
{
    public function __construct(
        private readonly IScheduleControlFactory $scheduleFactory,
        private readonly SignupButtonsFactory $buttonsFactory,
        private readonly NewsletterSignupFactory $newsletterFactory,
        private readonly IFaqControlFactory $faqFactory,
        private readonly ISpeakerListControlFactory $speakerListFactory,
        private readonly IProgramControlFactory $programFactory,
        private readonly IPartnersControlFactory $partnersControlFactory,
        private readonly OrgListProvider $orgListProvider,
    ) {
        parent::__construct();
    }


    public function renderDefault(): void
    {
        $this->template->isHp = true;
        $this->template->counts = $this->eventInfo->getCounts();
    }

    public function renderContact():void
    {
        $template = $this->template;

        $template->addFilter('formatPhoneLink', function (string $value)  {
            $formatted = preg_replace('~(\d{3})(\d{3})(\d{3})$~', '$1 $2 $3', $value);
            $formatted = (string)preg_replace_callback('~^((?:00|\+)\d+)(\d{3})~', static function ($matches) {
                if($matches[1] === '+420' || $matches[1] === '00420') {
                    return $matches[2];
                }
                return "{$matches[1]} {$matches[2]}";
            }, $formatted);

            return Html::el('a', [
                'href' => 'tel:' . urlencode($value),
            ])->setText($formatted);
        });

        $template->addFunction('isAbsoluteUrl', function (string $value) {
            return (bool)preg_match('~^https?://~', $value);
        });

        $template->orgs = $this->orgListProvider->getOrgs();
    }


    protected function createComponentSchedule(): ScheduleControl
    {
        return $this->scheduleFactory->create();
    }


    protected function createComponentSignupButtons(): SignupButtonsControl
    {
        return $this->buttonsFactory->create();
    }


    protected function createComponentNewsletterForm(): NewsletterSignupControl
    {
        return $this->newsletterFactory->create();
    }


    protected function createComponentFaq(): FaqControl
    {
        return $this->faqFactory->create();
    }


    protected function createComponentSpeakerList(): SpeakerListControl
    {
        return $this->speakerListFactory->create();
    }


    public function createComponentProgram(): ProgramControl
    {
        return $this->programFactory->create();
    }


    protected function createComponentPartners(): \App\Components\Partners\PartnersControl
    {
        return $this->partnersControlFactory->create();
    }
}
