<?php

namespace App\Components\Feed;

use App\Model\WordpressPostReader;
use Nette\Application\UI\Control;

class FeedControl extends Control
{
    public function __construct(
        private readonly WordpressPostReader $postReader
    ) {
    }


    public function render(): void
    {
        $this->template->setFile(__DIR__ . '/Feed.latte');
        $this->template->feed = $this->postReader->get();
        $this->template->sourceUrl = $this->postReader->getSourceUrl();
        $this->template->render();
    }
}
