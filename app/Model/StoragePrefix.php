<?php

namespace App\Model;

readonly class StoragePrefix
{
    public function __construct(
        private string $storageBase,
        private string $urlBase,
        private string $pathPrefix
    ) {
    }


    public function getStoragePath(): string
    {
        return $this->getStorageBase() . $this->getPathPrefix();
    }


    public function getUrlPath(): string
    {
        return $this->getUrlBase() . $this->getPathPrefix();
    }


    public function getStorageBase(): string
    {
        return $this->storageBase;
    }


    public function getUrlBase(): string
    {
        return $this->urlBase;
    }


    public function getPathPrefix(): string
    {
        return $this->pathPrefix;
    }
}
