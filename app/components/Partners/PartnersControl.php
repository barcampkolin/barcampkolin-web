<?php

namespace App\Components\Partners;

use App\Model\PartnersManager;
use Nette\Application\UI\Control;

class PartnersControl extends Control
{
    /**
     * PartnersControl constructor.
     * @param PartnersManager $partnerManager
     */
    public function __construct(private readonly PartnersManager $partnerManager)
    {
    }


    public function render(): void
    {
        $report = $this->partnerManager->getReport();

        $this->template->setFile(__DIR__ . '/Partners.latte');
        $this->template->report = $report;
        $this->template->render();
    }
}
