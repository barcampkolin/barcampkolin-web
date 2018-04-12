<?php

namespace App\Components\SpeakerList;

use App\Model\EventInfoProvider;
use App\Model\TalkManager;
use Nette\Application\UI\Control;

class SpeakerListControl extends Control
{

    /**
     * @var TalkManager
     */
    private $talkManager;
    /**
     * @var EventInfoProvider
     */
    private $eventInfoProvider;


    /**
     * SpeakerListControl constructor.
     * @param TalkManager $talkManager
     * @param EventInfoProvider $eventInfoProvider
     */
    public function __construct(TalkManager $talkManager, EventInfoProvider $eventInfoProvider)
    {
        $this->talkManager = $talkManager;
        $this->eventInfoProvider = $eventInfoProvider;
    }


    public function render()
    {
        if (!$this->eventInfoProvider->getFeatures()->talks) {
            return;
        }

        $talks = $this->talkManager->findActive();

        $this->template->setFile(__DIR__ . '/SpeakerList.latte');
        $this->template->talks = $talks;
        $this->template->render();
    }
}
