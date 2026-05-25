<?php

namespace App\Components\Enumerator;

interface IEnumeratorFormControlFactory
{

    /**
     * @param string $setName Name set name (in database)
     */
    public function create(string $setName): EnumeratorFormControl;

}
