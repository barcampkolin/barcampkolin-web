<?php

namespace App\Model;

use App\Orm\File;
use App\Orm\FileRepository;
use App\Orm\Orm;
use Nette\Http\FileUpload;

class FileManager
{
    /**
     * @var FileRepository
     */
    private $fileRepository;


    /**
     * @param Orm $orm
     * @param LocalFileStorage $fileStorage
     */
    public function __construct(
        Orm $orm,
        private readonly LocalFileStorage $fileStorage
    ) {
        $this->fileRepository = $orm->file;
    }


    /**
     * @return \Nextras\Orm\Collection\ICollection
     */
    public function findAll(): \Nextras\Orm\Collection\ICollection
    {
        return $this->fileRepository->findAll();
    }


    /**
     * @param string $url
     * @return bool
     */
    public function isManagable($url)
    {
        $match = $this->fileStorage->match($url);
        return $match;
    }


    /**
     * @param int $id
     * @return File|null
     * @throws \Nextras\Orm\InvalidArgumentException
     */
    public function getById($id): ?\Nextras\Orm\Entity\IEntity
    {
        return $this->fileRepository->getById($id);
    }


    /**
     * @param FileUpload $fileUpload
     * @param string|null $name
     * @return string
     * @throws \InvalidArgumentException
     * @throws \Nette\IOException
     * @throws \Nette\InvalidArgumentException
     */
    public function createByUpload(FileUpload $fileUpload, $name = null): string
    {
        // Set name from file if not defined
        $name ??= $fileUpload->name;

        $file = new File();
        $file->url = $url = $this->fileStorage->saveUploaded($fileUpload, $name);
        $file->name = $name;

        $this->fileRepository->persistAndFlush($file);

        return $url;
    }


    /**
     * @param File $file
     * @throws \InvalidArgumentException
     * @throws \Nette\IOException
     */
    public function remove(File $file): void
    {
        $this->fileStorage->delete($file->url);
        $this->fileRepository->removeAndFlush($file);
    }
}
