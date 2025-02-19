<?php

namespace App\Presenters;

use App\Components\Faq\FaqControl;
use App\Components\Faq\IFaqControlFactory;
use App\Components\Newsletter\NewsletterSignupControl;
use App\Components\Newsletter\NewsletterSignupFactory;
use App\Components\Partners\IPartnersControlFactory;
use App\Components\Program\IProgramControlFactory;
use App\Components\Schedule\IScheduleControlFactory;
use App\Components\Schedule\ScheduleControl;
use App\Components\SignupButtons\SignupButtonsControl;
use App\Components\SignupButtons\SignupButtonsFactory;
use App\Components\SpeakerList\ISpeakerListControlFactory;
use App\Components\SpeakerList\SpeakerListControl;

/**
 * Class HomepagePresenter
 * @package App\Presenters
 */
class HomepagePresenter extends BasePresenter
{
    /**
     * HomepagePresenter constructor.
     * @param IScheduleControlFactory $scheduleFactory
     * @param SignupButtonsFactory $buttonsFactory
     * @param NewsletterSignupFactory $newsletterFactory
     * @param IFaqControlFactory $faqFactory
     * @param ISpeakerListControlFactory $speakerListFactory
     * @param IProgramControlFactory $programFactory
     * @param IPartnersControlFactory $partnersControlFactory
     */
    public function __construct(
        private readonly IScheduleControlFactory $scheduleFactory,
        private readonly SignupButtonsFactory $buttonsFactory,
        private readonly NewsletterSignupFactory $newsletterFactory,
        private readonly IFaqControlFactory $faqFactory,
        private readonly ISpeakerListControlFactory $speakerListFactory,
        private readonly IProgramControlFactory $programFactory,
        private readonly IPartnersControlFactory $partnersControlFactory
    ) {
        parent::__construct();
    }


    /**
     *
     * @throws \Nette\Utils\JsonException
     */
    public function renderDefault(): void
    {
        $this->template->isHp = true;
        $this->template->counts = $this->eventInfo->getCounts();
    }


    /**
     * @return ScheduleControl
     */
    protected function createComponentSchedule()
    {
        return $this->scheduleFactory->create();
    }


    /**
     * @return SignupButtonsControl
     */
    protected function createComponentSignupButtons(): \App\Components\SignupButtons\SignupButtonsControl
    {
        return $this->buttonsFactory->create();
    }


    /**
     * @return NewsletterSignupControl
     */
    protected function createComponentNewsletterForm(): \App\Components\Newsletter\NewsletterSignupControl
    {
        return $this->newsletterFactory->create();
    }


    /**
     * @return FaqControl
     */
    protected function createComponentFaq(): \App\Components\Faq\FaqControl
    {
        return $this->faqFactory->create();
    }


    /**
     * @return SpeakerListControl
     */
    protected function createComponentSpeakerList()
    {
        return $this->speakerListFactory->create();
    }


    /**
     * @return mixed
     */
    public function createComponentProgram()
    {
        return $this->programFactory->create();
    }


    /**
     * @return \App\Components\Partners\PartnersControl
     */
    protected function createComponentPartners()
    {
        return $this->partnersControlFactory->create();
    }
}
