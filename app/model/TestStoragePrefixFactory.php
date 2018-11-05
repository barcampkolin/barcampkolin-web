<?php

namespace App\Model;

class TestStoragePrefixFactory implements IStoragePrefixFactory
{
    /**
     * @param string|null $pathYearPrefix
     * @param string|null $pathYearSuffix
     * @return StoragePrefix
     */
    public function create($pathYearPrefix, $pathYearSuffix)
    {
        return new StoragePrefix('/', 'http://example.com/', '/');
    }
}
