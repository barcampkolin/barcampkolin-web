<?php

namespace App\Model;

class ArchiveManager
{
    private $currentYear;
    private $storagePrefix;


    public function __construct(
        $currentYear,
        $storagePrefix

    ) {
        $this->currentYear = $currentYear;
        $this->storagePrefix = $storagePrefix;
    }


    public function getStoragePath($file)
    {
        $yearPrefix = '/' . $this->currentYear;
        $path = rtrim($this->storagePrefix, '/') . $yearPrefix . '/' . trim($file, '/');

        //deduplicate year prefix from url
        $path = str_replace("$yearPrefix$yearPrefix/", "$yearPrefix/", $path);

        return rtrim($path, '/') . '.html';
    }
}
