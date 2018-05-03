<?php

namespace App\Model;

use Nette\Http\Request;
use Nette\Utils\Image;
use Nette\Utils\Random;
use Nette\Utils\Strings;

class PartnerLogoStorage
{
    /**
     * @var string
     */
    private $uploadDir;
    /**
     * @var string
     */
    private $urlPrefix;

    /**
     * @var Request
     */
    private $request;


    /**
     * PartnerLogoStorage constructor.
     * @param string $uploadDir
     * @param string $urlPrefix
     * @param Request $request
     */
    public function __construct($uploadDir, $urlPrefix, Request $request)
    {
        $this->uploadDir = $uploadDir;
        $this->urlPrefix = $urlPrefix;
        $this->request = $request;
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
     * @param string|null $name
     * @return string
     */
    private function getFilename($name = null)
    {
        if ($name) {
            $name = Strings::webalize($name) . '-';
        }
        return $name . Random::generate(5) . '.png';
    }


    /**
     * @param string $filename
     * @return string
     */
    private function getStorageFilename($filename)
    {
        return $this->uploadDir . '/' . $filename;
    }


    /**
     * @param string $filename
     * @return string
     */
    private function getUrl($filename)
    {
        $baseUrl = $this->request->getUrl()->getBaseUrl();
        return $baseUrl . $this->urlPrefix . '/' . $filename;
    }
}
