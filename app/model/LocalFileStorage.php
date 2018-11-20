<?php

namespace App\Model;

use InvalidArgumentException;
use Nette\Http\FileUpload;
use Nette\Utils\FileSystem;
use Nette\Utils\Random;
use Nette\Utils\Strings;

class LocalFileStorage
{
    /**
     * @var StoragePrefix
     */
    private $storagePrefix;
    /**
     * @var bool Add unpredicted unique name when save content?
     */
    private $isRandomizeName;


    /**
     * @param StoragePrefix $storagePrefix
     * @param bool $isRandomizeName
     */
    public function __construct(StoragePrefix $storagePrefix, $isRandomizeName = true)
    {
        $this->storagePrefix = $storagePrefix;
        $this->isRandomizeName = $isRandomizeName;
    }


    /**
     * @param string $content
     * @param string $name
     * @param string $extextOverride
     * @return string
     * @throws InvalidArgumentException
     * @throws \Nette\IOException
     */
    public function saveContent($content, $name = null, $extextOverride = null)
    {
        $filename = $this->getSafeFilename($name, $extextOverride);
        $storageFile = $this->getStorageFilename($filename);

        FileSystem::write($storageFile, $content);

        return $this->getUrl($filename);
    }


    /**
     * @param FileUpload $file
     * @param string|null $name
     * @return string
     * @throws InvalidArgumentException
     * @throws \Nette\IOException
     * @throws \Nette\InvalidArgumentException
     */
    public function saveUploaded(FileUpload $file, $name = null)
    {
        $filename = $this->getSafeFilename($name, $this->getExtension($file->name));

        $storageFile = $this->getStorageFilename($filename);

        $file->move($storageFile);

        return $this->getUrl($filename);
    }


    /**
     * @param string|null $name
     * @param string|null $extOverride
     * @return string
     * @throws InvalidArgumentException
     * @throws \Nette\InvalidArgumentException
     */
    public function getSafeFilename($name, $extOverride = null)
    {
        $filename = pathinfo((string)$name, PATHINFO_FILENAME);

        if ($this->isRandomizeName) {
            $filename .= '-' . Random::generate(10);
        }

        $filename = Strings::webalize($filename);

        if ($filename === '') {
            throw new InvalidArgumentException('Filename is empty or contain only invalid chars.'
                . 'Add filename or allow LocalStorage to add random filename.');
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


    /**
     * @param string $url
     * @return bool
     */
    public function match($url)
    {
        $urlPrefix = $this->storagePrefix->getUrlPath();
        return strpos($url, $urlPrefix) === 0;
    }


    /**
     * @param string $url
     * @return bool
     * @throws InvalidArgumentException
     */
    public function exists($url)
    {
        $filename = $this->urlToFilename($url);
        return file_exists($filename);
    }


    /**
     * @param string $url
     * @return string
     * @throws InvalidArgumentException
     * @throws \Nette\IOException
     */
    public function getFileContent($url)
    {
        $filename = $this->urlToFilename($url);
        return FileSystem::read($filename);
    }


    /**
     * @param string $url
     * @throws InvalidArgumentException
     * @throws \Nette\IOException
     */
    public function delete($url)
    {
        $filename = $this->urlToFilename($url);
        FileSystem::delete($filename);
    }


    /**
     * @param string $url
     * @return string
     * @throws InvalidArgumentException
     */
    protected function urlToFilename($url)
    {
        $urlPrefix = $this->storagePrefix->getUrlPath();
        $storagePrefix = $this->storagePrefix->getStoragePath();

        // Check jurisdiction
        if($this->match($url) === false)
        throw new InvalidArgumentException("URL \"$url\" is not matching to prefix \"$urlPrefix\"");

        $filename = str_replace($urlPrefix, $storagePrefix, $url);

        return $filename;
    }


    /**
     * @param string $name
     * @return string
     */
    protected function getExtension($name)
    {
        return pathinfo($name, PATHINFO_EXTENSION);
    }


    /**
     * @param string $filename
     * @return string
     * @throws \Nette\IOException
     */
    protected function getStorageFilename($filename)
    {
        $uploadDir = $this->storagePrefix->getStoragePath();
        FileSystem::createDir($uploadDir);
        return $uploadDir . '/' . $filename;
    }


    /**
     * @param string $filename
     * @return string
     */
    protected function getUrl($filename)
    {
        return $this->storagePrefix->getUrlPath() . '/' . $filename;
    }
}
