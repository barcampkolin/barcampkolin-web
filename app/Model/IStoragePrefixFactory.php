<?php

namespace App\Model;

interface IStoragePrefixFactory
{
    public function create(?string $pathYearPrefix, ?string $pathYearSuffix):StoragePrefix;
}
