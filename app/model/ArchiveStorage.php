<?php

namespace App\Model;

use Nette\FileNotFoundException;
use Nette\Utils\FileSystem;
use Nette\Utils\Strings;

class ArchiveStorage
{
    /**
     * @param string $storagePrefix
     */
    public function __construct(private $storagePrefix)
    {
    }


    /**
     * @param $fileName
     * @param $content
     * @return string
     * @throws \Nette\IOException
     */
    public function savePage($fileName, string $content): void
    {
        $filename = $this->getFilename($fileName);

        $storageFile = $this->getStorageFilename($filename);

        FileSystem::write($storageFile, $content);
    }


    public function loadPage($fileName): string
    {
        $filename = $this->getFilename($fileName);

        $storageFile = $this->getStorageFilename($filename);

        if (!is_file($storageFile)) {
            throw new FileNotFoundException("File $storageFile not found");
        }

        return FileSystem::read($storageFile);
    }


    /**
     * @param string $name
     * @param string $ext
     * @return string
     */
    private function getFilename(string $name, string $ext = 'html'): string
    {
        return Strings::webalize($name) . '.' . $ext;
    }


    /**
     * @param string $filename
     * @return string
     * @throws \Nette\IOException
     */
    private function getStorageFilename(string $filename): string
    {
        $uploadDir = $this->storagePrefix;
        FileSystem::createDir($uploadDir);
        return $uploadDir . '/' . $filename;
    }


}
