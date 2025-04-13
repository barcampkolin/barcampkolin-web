<?php

namespace App\AdminModule\Presenters;

use App\Model\ApiTokenManager;
use App\Model\DebugEnabler;
use Nette\Application\Request;
use Ublaboo\DataGrid\Column\Action\Confirmation\StringConfirmation;
use Ublaboo\DataGrid\DataGrid;

class SystemPresenter extends BasePresenter
{
    public function __construct(
        private readonly ApiTokenManager $apiTokenManager
    ) {
        parent::__construct();
    }


    public function renderDefault(): void
    {
        $this->template->isDebug = DebugEnabler::isDebug();
        $this->template->isDebugByEnv = DebugEnabler::isDebugByEnv();
        $this->template->secured = $this->getRequest()->hasFlag(Request::SECURED);
    }


    /**
     * @throws \Nette\Application\AbortException
     * @secured
     */
    public function handleTurnDebugOff(): void
    {
        DebugEnabler::turnOff();
        $this->flashMessage('Ladící režim vypnut', 'success');
        $this->redirect('this');
    }


    /**
     * @throws \Nette\Application\AbortException
     * @secured
     */
    public function handleTurnDebugOn(): void
    {
        DebugEnabler::turnOn();
        $this->flashMessage('Ladící režim zapnut', 'success');
        $this->redirect('this');
    }


    /**
     * @param $name
     * @return DataGrid
     * @throws \Nette\Utils\JsonException
     * @throws \Ublaboo\DataGrid\Exception\DataGridException
     */
    public function createComponentApiTokensDatagrid($name): \Ublaboo\DataGrid\DataGrid
    {
        $hashes = $this->apiTokenManager->getTokenHashes();

        $grid = new DataGrid($this, $name);
        DataGrid::$iconPrefix = 'glyphicon glyphicon-';

        $grid->setPrimaryKey('key');
        $grid->setDataSource($hashes);

        $grid->addToolbarButton('createToken', 'Nový API token')
            ->setClass('btn btn-xs btn-primary')
            ->setIcon('plus');

        $grid->addColumnText('key', 'Název klíče');

        $grid->addAction('delete', '', 'deleteApiToken!')
            ->setIcon('trash')
            ->setTitle('Smazat')
            ->setClass('btn btn-xs btn-danger ajax')
            ->setConfirmation(
                new StringConfirmation(
                    'Smazáním tokenu může dojít k poškození funkčnosti. Opravdu chcete smazat token %s?', 'key'
                )
            );

        return $grid;
    }


    /**
     * @param $id
     * @throws \Nette\Application\AbortException
     */
    public function handleDeleteApiToken($id): void
    {
        $this->flashMessage('Token smazán', 'success');
        $this->redirect('this');
    }
}
