<?php

namespace App\Mails;

use Nette\Mail\SendException;

interface IMessage
{
    public function send();


    public function getTemplate(): ITemplate;


    public function getTemplateParameters(): array;


    public function getRecipients(): array;


    public function getSubject(): string;
}
