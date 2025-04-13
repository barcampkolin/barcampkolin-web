<?php

namespace App\Components\Newsletter;

use App\Model\NewsletterSignupManager;

class NewsletterSignupFactory
{
    /**
     * NewsletterSignupFactory constructor.
     * @param NewsletterSignupManager $signupManager
     */
    public function __construct(
        private readonly NewsletterSignupManager $signupManager
    ) {
    }


    /**
     * @return NewsletterSignupControl
     */
    public function create(): \App\Components\Newsletter\NewsletterSignupControl
    {
        return new NewsletterSignupControl($this->signupManager);
    }
}
