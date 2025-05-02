<?php

declare(strict_types=1);

namespace App\Model;

use Nette\Utils\ArrayHash;

class OrgListProvider
{

    public function __construct(private readonly array $orgs)
    {
    }

    public function getOrgs(): iterable
    {
        foreach ($this->orgs as $org) {
            yield ArrayHash::from($org);
        }
    }
}
