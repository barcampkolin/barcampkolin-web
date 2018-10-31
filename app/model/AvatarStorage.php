<?php

namespace App\Model;

use Nette\Utils\FileSystem;
use Nette\Utils\Image;
use Nette\Utils\Random;

class AvatarStorage
{

    /**
     * @var StoragePrefix
     */
    private $storagePrefix;


    public function __construct(StoragePrefix $storagePrefix)
    {
        $this->storagePrefix = $storagePrefix;
    }


    public function saveImage(Image $image)
    {
        $image->resize(200, 200, Image::EXACT);
        $filename = $this->getFilename();

        $storageFile = $this->getStorageFilename($filename);

        $image->save($storageFile);

        return $this->getUrl($filename);
    }


    private function getFilename()
    {
        return Random::generate() . '.jpg';
    }


    private function getStorageFilename($filename)
    {
        $uploadDir = $this->storagePrefix->getStoragePath();
        FileSystem::createDir($uploadDir);
        return $uploadDir . '/' . $filename;
    }


    private function getUrl($filename)
    {

        return $this->storagePrefix->getUrlPath() . '/' . $filename;
    }
}
