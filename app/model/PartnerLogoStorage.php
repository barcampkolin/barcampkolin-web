<?php

namespace App\Model;

use Nette\Http\FileUpload;
use Nette\Http\Request;
use Nette\Utils\FileSystem;
use Nette\Utils\Image;
use Nette\Utils\Random;
use Nette\Utils\Strings;

class PartnerLogoStorage
{
    /**
     * @var StoragePrefix
     */
    private $storagePrefix;


    public function __construct(StoragePrefix $storagePrefix)
    {
        $this->storagePrefix = $storagePrefix;
    }


    /**
     * @param Image $image
     * @param string|null $name
     * @return string
     */
    public function saveImage(Image $image, $name = null)
    {
        $filename = $this->getFilename($name);

        $storageFile = $this->getStorageFilename($filename);

        $image->save($storageFile);

        return $this->getUrl($filename);
    }


    /**
     * @param FileUpload $file
     * @param string|null $name
     * @return string
     */
    public function saveUploaded(FileUpload $file, $name = null)
    {
        $filename = $this->getFilename($name, $this->getExtension($file->name));

        $storageFile = $this->getStorageFilename($filename);

        $file->move($storageFile);

        return $this->getUrl($filename);
    }


    /**
     * @param $name
     * @return string
     */
    private function getExtension($name)
    {
        return pathinfo($name, PATHINFO_EXTENSION);
    }

    /**
     * @param string|null $name
     * @param string $ext
     * @return string
     */
    private function getFilename($name = null, $ext = 'png')
    {
        if ($name) {
            $name = Strings::webalize($name) . '-';
        }
        return $name . Random::generate(5) . '.' . $ext;
    }


    /**
     * @param string $filename
     * @return string
     */
    private function getStorageFilename($filename)
    {
        $uploadDir = $this->storagePrefix->getStoragePath();
        FileSystem::createDir($uploadDir);
        return $uploadDir . '/' . $filename;
    }


    /**
     * @param string $filename
     * @return string
     */
    private function getUrl($filename)
    {
        return $this->storagePrefix->getUrlPath() . '/' . $filename;
    }
}
