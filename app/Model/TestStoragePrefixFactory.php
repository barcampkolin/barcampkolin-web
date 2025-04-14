<?php

namespace App\Model;

class TestStoragePrefixFactory implements IStoragePrefixFactory
{
    /**
     * @param string|null $pathYearPrefix
     * @param string|null $pathYearSuffix
     * @return StoragePrefix
     */
    public function create($pathYearPrefix, $pathYearSuffix): \App\Model\StoragePrefix
    {
        return new StoragePrefix('/local/path', 'http://example.com/url-path', '/prefix');
    }
}
