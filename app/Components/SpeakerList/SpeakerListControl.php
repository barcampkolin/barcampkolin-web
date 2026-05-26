<?php

namespace App\Components\SpeakerList;

use App\Model\EventInfoProvider;
use App\Model\GravatarImageProvider;
use App\Model\TalkManager;
use App\Orm\Talk\Talk;
use Nette\Application\UI\Control;
use Nette\Bridges\ApplicationLatte\Template as LatteTemplate;

class SpeakerListControl extends Control
{

    public function __construct(
        private readonly TalkManager $talkManager,
        private readonly EventInfoProvider $eventInfoProvider,
        private readonly GravatarImageProvider $gravatarImageProvider,
    ) {
    }


    public function render(): void
    {
        $talks = $this->talkManager->findActive();

        if ($talks->countStored() === 0) {
            return;
        }

        $talk = new Talk();
        $talk->program->countStored();

        /** @var LatteTemplate $template */
        $template = $this->template;
        $template->setFile(__DIR__ . '/SpeakerList.latte');
        $template->talks = $talks;
        $template->isProgram = $this->eventInfoProvider->getFeatures()->program;
        $template->addFunction('gravatarize', $this->gravatarImageProvider->gravatarize(...));
        $template->render();
    }
}
