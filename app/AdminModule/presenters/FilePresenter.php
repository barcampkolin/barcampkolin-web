<?php

namespace App\AdminModule\Presenters;

use App\Model\FileManager;
use App\Orm\File;
use Nette\Application\UI\Form;
use Nette\Application\UI\Presenter;
use Nette\Utils\ArrayHash;
use Nette\Utils\Html;
use Ublaboo\DataGrid\DataGrid;

class FilePresenter extends BasePresenter
{
    /**
     * @var FileManager
     */
    private $fileManager;


    public function __construct(FileManager $fileManager)
    {
        $this->fileManager = $fileManager;
    }


    public function renderDefault()
    {

    }


    public function createComponentFileDatagrid($name)
    {
        $grid = new DataGrid($this, $name);
        DataGrid::$icon_prefix = 'glyphicon glyphicon-';

        $grid->setDataSource($this->fileManager->findAll());

        $grid->addToolbarButton('upload', 'Nahrát soubor…')
            ->setClass('btn btn-xs btn-primary')
            ->setIcon('cloud-upload');


        $grid->addColumnText('name', 'Název')->setRenderer(function ($item) {
            /** @var File $item */
            return Html::el('a')->href($item->url)->addAttributes([
                'target' => '_blank',
                'rel' => 'noopener'
            ])->setText($item->name);
        });

        $grid->addColumnText('url', 'Veřejná URL');

        $grid->addAction('delete', 'Smazat', 'deleteFile!')->setIcon('trash')
            ->setClass('btn btn-xs btn-danger ajax')
            ->setConfirm('Opravdu chcete smazat soubor %s?', 'name')
            ->setRenderCondition(function ($item) {
                /** @var File $item */
                return $this->fileManager->isManagable($item->url);
            });

        return $grid;
    }


    /**
     * @param $id
     * @secured
     * @throws \Nette\Application\AbortException
     */
    public function handleDeleteFile($id)
    {
        $file = $this->fileManager->getById($id);

        $this->fileManager->remove($file);

        if ($this->isAjax()) {
            $this['fileDatagrid']->reload();
        } else {
            $this->redirect('this');
        }
    }


    public function createComponentUploadForm()
    {
        $form = new Form();

        $form->addUpload('file', 'Soubor ke zveřejnění')
            ->setRequired(true);

        $form->addText('name', 'Název souboru', null, 60)
            ->setOption(
                'description',
                'Volitelné. Zadejte jen pokud chcete upravit název souboru.'
            );

        $form->addSubmit('submit', 'Nahrát')->setOption('primary', true);

        $form->addProtection();

        $form->onSuccess[] = [$this, 'onUploadFormSuccess'];

        return $form;
    }


    public function onUploadFormSuccess(Form $form, ArrayHash $values)
    {
        $name = empty((string)$values->name) ? null : $values->name;
        $file = $values->file;
        $url = $this->fileManager->createByUpload($file, $name);

        $this->flashMessage(
            Html::el()
                ->setText('Soubor nahrán na URL: ')
                ->addHtml(
                    Html::el('code')->addText($url)
                ),
            'success');

        $this->redirect('default');
    }
}
