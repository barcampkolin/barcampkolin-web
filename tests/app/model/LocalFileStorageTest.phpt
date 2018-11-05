<?php

namespace Test\App\Model;

use App\Model\IStoragePrefixFactory;
use App\Model\LocalFileStorage;
use App\Model\StoragePrefix;
use InvalidArgumentException;
use Nette\DI\Container;
use Tester\Assert;

/** @var Container $container */
$container = require __DIR__ . '/../../bootstrap.php';



class LocalFileStorageTest extends \Tester\TestCase
{

    /**
     * @var StoragePrefix
     */
    private $storagePrefix;


    public function __construct(StoragePrefix $storagePrefix)
    {
        $this->storagePrefix = $storagePrefix;
    }


    public function testSafeFilename()
    {
        $localStorage = $this->getStorageWithoutRandom();
        Assert::equal('test-extended.jpg', $localStorage->getSafeFilename('Test.extended.JPG'));
    }


    public function testSafeFilenameNoExt()
    {
        $localStorage = $this->getStorageWithoutRandom();
        Assert::equal('test.bin', $localStorage->getSafeFilename('Test'));
    }


    public function testSafeFilenameOwerrideExt()
    {
        $localStorage = $this->getStorageWithoutRandom();
        Assert::equal('test.png', $localStorage->getSafeFilename('Test.JPG', 'PNG'));
    }


    public function testSafeFilenameOwerrideInvalidExt()
    {
        $localStorage = $this->getStorageWithoutRandom();
        Assert::equal('test.bin', $localStorage->getSafeFilename('Test.JPG', '___'));
    }


    public function testSafeFilenameRandom()
    {
        $localStorage = $this->getStorageWithRandom();
        Assert::match('#^test-[0-9a-z]{10}.jpg$#', $localStorage->getSafeFilename('Test.JPG'));
    }


    public function testSafeFilenameNoName()
    {
        $localStorage = $this->getStorageWithoutRandom();
        Assert::exception(function () use ($localStorage) {
            $localStorage->getSafeFilename('');
        }, InvalidArgumentException::class,
            'Filename is empty or contain only invalid chars.'
            . 'Add filename or allow LocalStorage to add random filename.');
    }


    public function testSafeFilenameInvalidName()
    {
        $localStorage = $this->getStorageWithoutRandom();
        Assert::exception(function () use ($localStorage) {
            $localStorage->getSafeFilename('___', 'not-matter');
        }, InvalidArgumentException::class,
            'Filename is empty or contain only invalid chars.'
            . 'Add filename or allow LocalStorage to add random filename.');
    }


    public function testSafeFilenameRandomNoName()
    {
        $localStorage = $this->getStorageWithRandom();
        Assert::match('#^[0-9a-z]{10}.bin#', $localStorage->getSafeFilename(''));
    }


    public function testSafeFilenameRandomOnlyOwerrideExt()
    {
        $localStorage = $this->getStorageWithRandom();
        Assert::match('#^[0-9a-z]{10}.png#', $localStorage->getSafeFilename('', 'png'));
    }


    /**
     * @return LocalFileStorage
     */
    private function getStorageWithRandom()
    {
        return new LocalFileStorage($this->storagePrefix, true);
    }


    /**
     * @return LocalFileStorage
     */
    private function getStorageWithoutRandom()
    {
        return new LocalFileStorage($this->storagePrefix, false);
    }
}



/** @var IStoragePrefixFactory $storagePrefixer */
$storagePrefixer = $container->getService('publicStoragePrefixer');
$storagePrefix = $storagePrefixer->create('/', '/');

$test = new LocalFileStorageTest($storagePrefix);
$test->run();
