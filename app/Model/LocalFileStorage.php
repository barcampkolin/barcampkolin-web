<?php

namespace App\Model;

use InvalidArgumentException;
use Nette\Http\FileUpload;
use Nette\Utils\FileSystem;
use Nette\Utils\Random;
use Nette\Utils\Strings;

class LocalFileStorage
{
    public function __construct(
        private readonly StoragePrefix $storagePrefix,
        private readonly bool $isRandomizeName = true
    ) {
    }


    public function saveContent(string $content, ?string $name = null, ?string $extextOverride = null): string
    {
        $filename = $this->getSafeFilename($name, $extextOverride);
        $storageFile = $this->getStorageFilename($filename);

        FileSystem::write($storageFile, $content);

        return $this->getUrl($filename);
    }


    public function saveUploaded(FileUpload $file, ?string $name = null): string
    {
        $filename = $this->getSafeFilename($name, $this->getExtension($file->name));

        $storageFile = $this->getStorageFilename($filename);

        $file->move($storageFile);

        return $this->getUrl($filename);
    }


    public function getSafeFilename(?string $name, ?string $extOverride = null): string
    {
        $filename = pathinfo((string)$name, PATHINFO_FILENAME);

        if ($this->isRandomizeName) {
            $filename .= '-' . Random::generate(10);
        }

        $filename = Strings::webalize($filename);

        if ($filename === '') {
            throw new InvalidArgumentException(
                'Filename is empty or contain only invalid chars.'
                . 'Add filename or allow LocalStorage to add random filename.'
            );
        }

        if ($extOverride !== null) {
            $ext = Strings::webalize($extOverride);
        } else {
            $ext = Strings::webalize($this->getExtension((string)$name));
        }


        $output = $filename;
        $output .= '.';
        $output .= $ext !== '' ? $ext : 'bin';

        return $output;
    }


    public function match(string $url): bool
    {
        $urlPrefix = $this->storagePrefix->getUrlPath();
        return str_starts_with($url, $urlPrefix);
    }


    public function exists(string $url): bool
    {
        $filename = $this->urlToFilename($url);
        return file_exists($filename);
    }


    public function getFileContent(string $url): string
    {
        $filename = $this->urlToFilename($url);
        return FileSystem::read($filename);
    }


    public function delete(string $url): void
    {
        $filename = $this->urlToFilename($url);
        FileSystem::delete($filename);
    }


    protected function urlToFilename(string $url): string
    {
        $urlPrefix = $this->storagePrefix->getUrlPath();
        $storagePrefix = $this->storagePrefix->getStoragePath();

        // Check jurisdiction
        if ($this->match($url) === false) {
            throw new InvalidArgumentException("URL \"$url\" is not matching to prefix \"$urlPrefix\"");
        }

        return str_replace($urlPrefix, $storagePrefix, $url);
    }


    protected function getExtension(string $name): string
    {
        return pathinfo($name, PATHINFO_EXTENSION);
    }


    protected function getStorageFilename(string $filename): string
    {
        $uploadDir = $this->storagePrefix->getStoragePath();
        FileSystem::createDir($uploadDir);
        return $uploadDir . '/' . $filename;
    }


    protected function getUrl(string $filename): string
    {
        return $this->storagePrefix->getUrlPath() . '/' . $filename;
    }
}
