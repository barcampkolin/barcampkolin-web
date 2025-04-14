<?php

namespace App\Components\SpeakerList;

use App\Model\EventInfoProvider;
use App\Model\GravatarImageProvider;
use App\Model\TalkManager;
use App\Orm\Talk\Talk;
use Nette\Application\UI\Control;

class SpeakerListControl extends Control
{

    /**
     * SpeakerListControl constructor.
     * @param TalkManager $talkManager
     * @param EventInfoProvider $eventInfoProvider
     */
    public function __construct(
        private readonly TalkManager $talkManager,
        private readonly EventInfoProvider $eventInfoProvider,
        private readonly GravatarImageProvider $gravatarImageProvider,
    ) {
    }


    /**
     * @throws \Nette\Utils\JsonException
     */
    public function render(): void
    {
        $talks = $this->talkManager->findActive();

        if ($talks->countStored() == 0) {
            return;
        }

        $talk = new Talk();
        $talk->program->countStored();

        $this->template->setFile(__DIR__ . '/SpeakerList.latte');
        $this->template->talks = $talks;
        $this->template->isProgram = $this->eventInfoProvider->getFeatures()['program'];
        $this->template->addFunction('gravatarize', $this->gravatarImageProvider->gravatarize(...));
        $this->template->render();
    }
}
