<?php

namespace App\Model;

use Nette\Http\FileUpload;
use Nette\Utils\FileSystem;
use Nette\Utils\Image;
use Nette\Utils\Random;
use Nette\Utils\Strings;

readonly class PartnerLogoStorage
{
    public function __construct(
        private StoragePrefix $storagePrefix
    ) {
    }


    public function saveImage(Image $image, ?string $name = null): string
    {
        $filename = $this->getFilename($name);

        $storageFile = $this->getStorageFilename($filename);

        $image->save($storageFile);

        return $this->getUrl($filename);
    }


    public function saveUploaded(FileUpload $file, ?string $name = null): string
    {
        $filename = $this->getFilename($name, $this->getExtension($file->name));

        $storageFile = $this->getStorageFilename($filename);

        $file->move($storageFile);

        return $this->getUrl($filename);
    }


    private function getExtension(string $name): string
    {
        return pathinfo($name, PATHINFO_EXTENSION);
    }


    private function getFilename(?string $name = null, string $ext = 'png'): string
    {
        if ($name) {
            $name = Strings::webalize($name) . '-';
        }
        return $name . Random::generate(5) . '.' . $ext;
    }


    private function getStorageFilename(string $filename): string
    {
        $uploadDir = $this->storagePrefix->getStoragePath();
        FileSystem::createDir($uploadDir);
        return $uploadDir . '/' . $filename;
    }


    private function getUrl(string $filename): string
    {
        return $this->storagePrefix->getUrlPath() . '/' . $filename;
    }
}
