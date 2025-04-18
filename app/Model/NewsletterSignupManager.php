<?php

namespace App\Model;

use Nette\Database\Context;
use Nette\Database\UniqueConstraintViolationException;
use Nette\Utils\DateTime;

class NewsletterSignupManager
{
    const
        TABLE_NAME = 'newsletter_subscribe',
        COLUMN_EMAIL = 'email',
        COLUMN_CONSENT_DATE = 'consent_date',
        COLUMN_CONSENT_DESC = 'consent_desc';


    /**
     * NewsletterSignupManager constructor.
     * @param Context $database
     */
    public function __construct(
        private readonly Context $database
    ) {
    }


    /**
     * @param string $email
     * @param string $consentDesc
     * @throws DuplicateNameException
     */
    public function add($email, $consentDesc): void
    {
        try {
            $this->database->table(self::TABLE_NAME)->insert([
                self::COLUMN_EMAIL => $email,
                self::COLUMN_CONSENT_DATE => new DateTime(),
                self::COLUMN_CONSENT_DESC => $consentDesc,
            ]);
        } catch (UniqueConstraintViolationException) {
            throw new DuplicateNameException();
        }
    }
}
