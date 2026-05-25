<?php

namespace App\Components\Newsletter;

use App\Model\NewsletterSignupManager;

readonly class NewsletterSignupFactory
{
    public function __construct(
        private NewsletterSignupManager $signupManager
    ) {
    }


    public function create(): NewsletterSignupControl
    {
        return new NewsletterSignupControl($this->signupManager);
    }
}
