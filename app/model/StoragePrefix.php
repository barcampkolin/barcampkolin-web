<?php

namespace App\Model;

class StoragePrefix
{
    /**
     * @param string $storageBase
     * @param string $urlBase
     * @param string $pathPrefix
     */
    public function __construct(private $storageBase, private $urlBase, private $pathPrefix)
    {
    }


    /**
     * @return string
     */
    public function getStoragePath(): string
    {
        return $this->getStorageBase() . $this->getPathPrefix();
    }


    /**
     * @return string
     */
    public function getUrlPath(): string
    {
        return $this->getUrlBase() . $this->getPathPrefix();
    }


    /**
     * @return string
     */
    public function getStorageBase()
    {
        return $this->storageBase;
    }


    /**
     * @return string
     */
    public function getUrlBase()
    {
        return $this->urlBase;
    }


    /**
     * @return string
     */
    public function getPathPrefix()
    {
        return $this->pathPrefix;
    }


}
