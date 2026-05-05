<?php

namespace App\Model;

use App\Orm\File\File;
use App\Orm\File\FileRepository;
use App\Orm\Orm;
use Nette\Http\FileUpload;
use Nextras\Orm\Collection\ICollection;

readonly class FileManager
{
    private FileRepository $fileRepository;


    public function __construct(
        Orm $orm,
        private LocalFileStorage $fileStorage
    ) {
        $this->fileRepository = $orm->file;
    }


    /**
     * @return ICollection<File>
     */
    public function findAll(): ICollection
    {
        return $this->fileRepository->findAll();
    }


    public function isManagable(string $url): bool
    {
        return $this->fileStorage->match($url);
    }


    public function getById(int $id): ?File
    {
        return $this->fileRepository->getById($id);
    }


    public function createByUpload(FileUpload $fileUpload, ?string $name = null): string
    {
        // Set name from file if not defined
        $name ??= $fileUpload->name;

        $file = new File();
        $file->url = $url = $this->fileStorage->saveUploaded($fileUpload, $name);
        $file->name = $name;

        $this->fileRepository->persistAndFlush($file);

        return $url;
    }


    public function remove(File $file): void
    {
        $this->fileStorage->delete($file->url);
        $this->fileRepository->removeAndFlush($file);
    }
}
