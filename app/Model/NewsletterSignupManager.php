<?php

namespace App\Model;

use Nette\Database\Explorer;
use Nette\Database\UniqueConstraintViolationException;
use Nette\Utils\DateTime;

class NewsletterSignupManager
{
    private const string  TABLE_NAME = 'newsletter_subscribe';
    private const string  COLUMN_EMAIL = 'email';
    private const string  COLUMN_CONSENT_DATE = 'consent_date';
    private const string  COLUMN_CONSENT_DESC = 'consent_desc';


    public function __construct(
        private readonly Explorer $database
    ) {
    }


    public function add(string $email, string $consentDesc): void
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
