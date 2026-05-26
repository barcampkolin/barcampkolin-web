<?php

namespace App\AdminModule\Presenters;

use App\Model\ApiTokenManager;
use Nette\Application\Request;
use Redbitcz\DebugMode;
use Ublaboo\DataGrid\Column\Action\Confirmation\StringConfirmation;
use Ublaboo\DataGrid\DataGrid;

class SystemPresenter extends BasePresenter
{
    public function __construct(
        private readonly ApiTokenManager $apiTokenManager,
        private readonly DebugMode\Detector $debugMode
    ) {
        parent::__construct();
    }


    public function renderDefault(): void
    {
        $this->template->isDebug = $this->debugMode->isDebugMode();
        $this->template->isDebugByEnabler = $this->debugMode->isDebugModeByEnabler() !== null;
        $this->template->secured = $this->getHttpRequest()->isSecured();
    }


    /** @secured */
    public function handleTurnDebugOff(): never
    {
        $this->debugMode->getEnabler()->activate(false);
        $this->flashMessage('Ladící režim vypnut.', 'success');
        $this->redirect('this');
    }


    /** @secured */
    public function handleTurnDebugOn(): never
    {
        $this->debugMode->getEnabler()->activate(true);
        $this->flashMessage('Ladící režim zapnut.', 'success');
        $this->redirect('this');
    }


    public function handleResetDebug(): never
    {
        $this->debugMode->getEnabler()->deactivate();
        $this->flashMessage('Ladící režim vrácen do výchozí hodnoty – nyní jej určuje nastavení prostředí.', 'success');
        $this->redirect('this');
    }


    public function createComponentApiTokensDatagrid(?string $name): DataGrid
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

        // // Not implemented yet

        //$grid->addAction('delete', '', 'deleteApiToken!')
        //    ->setIcon('trash')
        //    ->setTitle('Smazat')
        //    ->setClass('btn btn-xs btn-danger ajax')
        //    ->setConfirmation(
        //        new StringConfirmation(
        //            'Smazáním tokenu může dojít k poškození funkčnosti. Opravdu chcete smazat token %s?', 'key'
        //        )
        //    );

        return $grid;
    }
}
