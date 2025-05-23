<?php

namespace App\Model;

use Nette\Http\FileUpload;
use Nette\Utils\FileSystem;
use Nette\Utils\Image;
use Nette\Utils\Random;
use Nette\Utils\Strings;

class AvatarStorage
{

    public function __construct(
        private readonly StoragePrefix $storagePrefix,
        private readonly int $size
    ) {
    }


    public function saveUploaded(FileUpload $file, $name = null): array
    {
        if ($file->isImage() === false) {
            throw new \RuntimeException(
                sprintf('File must by one of image type, \'%s\' type instead', $file->getContentType())
            );
        }

        $name = Strings::truncate(Strings::webalize($name ?? $this->getRandom()), 20, '');
        $url = [$this->saveImage($file, $name)];

        $extension = explode('/', (string)$file->getContentType())[1];
        $filename = $this->getAttributedFilename($name, 'original', $extension);
        $file->move($this->getStorageFilename($filename));

        $url[] = $this->getUrl($filename);

        return $url;
    }

    public function saveImage(FileUpload $file, string $name): string
    {
        $image = $file->toImage();

        $image->resize($this->size, $this->size, Image::EXACT);

        $filename = $this->getAttributedFilename($name, 'thumb', 'jpeg');
        $storageFile = $this->getStorageFilename($filename);

        $image->save($storageFile);

        return $this->getUrl($filename);
    }


    private function getRandom(): string
    {
        return Random::generate();
    }

    private function getAttributedFilename(string $name, string $variant, string $extension): string
    {
        return sprintf('%s-%s-%s.%s', $name, $this->getRandom(), $variant, $extension);
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
