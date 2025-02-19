<?php

namespace App\Components\Faq;

use App\Model\EnumeratorManager;
use Nette\Application\UI\Control;

class FaqControl extends Control
{
    /**
     * FaqControl constructor.
     * @param EnumeratorManager $enumeratorManager
     */
    public function __construct(private readonly EnumeratorManager $enumeratorManager)
    {
    }


    /**
     * @throws \App\Model\InvalidEnumeratorSetException
     * @throws \Nette\Utils\JsonException
     */
    public function render(): void
    {
        $faqs = $this->enumeratorManager->get(EnumeratorManager::SET_FAQS);

        if (count($faqs)) {
            $this->renderFaqs($faqs);
        } else {
            $this->renderBlank();
        }
    }


    private function renderFaqs(array $faqs): void
    {
        $this->template->faqs = $faqs;
        $this->template->setFile(__DIR__ . '/Faq.latte');
        $this->template->render();
    }


    private function renderBlank()
    {
    }
}
