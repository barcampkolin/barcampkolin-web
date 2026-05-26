<?php

namespace App\Model;

class TestStoragePrefixFactory implements IStoragePrefixFactory
{
    public function create(?string $pathYearPrefix, ?string $pathYearSuffix): StoragePrefix
    {
        return new StoragePrefix('/local/path', 'http://example.com/url-path', '/prefix');
    }
}
