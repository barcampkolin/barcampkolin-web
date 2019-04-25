<?php

namespace App\Mails;

use Nette\Mail\SendException;

interface IMessage
{
    /**
     * @throws SendException
     */
    public function send();


    /**
     * @return ITemplate
     */
    public function getTemplate();


    /**
     * @return array
     */
    public function getTemplateParameters();


    /**
     * @return array
     */
    public function getRecipients();


    /**
     * @return string
     */
    public function getSubject();
}
