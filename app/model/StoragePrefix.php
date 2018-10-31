<?php

namespace App\Model;

class StoragePrefix
{
    /**
     * @var string
     */
    private $storageBase;
    /**
     * @var string
     */
    private $urlBase;
    /**
     * @var string
     */
    private $pathPrefix;


    public function __construct($storageBase, $urlBase, $pathPrefix)
    {
        $this->storageBase = $storageBase;
        $this->urlBase = $urlBase;
        $this->pathPrefix = $pathPrefix;
    }


    /**
     * @return string
     */
    public function getStoragePath()
    {
        return $this->getStorageBase() . $this->getPathPrefix();
    }


    /**
     * @return string
     */
    public function getUrlPath()
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
