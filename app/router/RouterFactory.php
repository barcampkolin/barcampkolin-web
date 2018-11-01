<?php

namespace App;

use Nette;
use Nette\Application\Routers\Route;
use Nette\Application\Routers\RouteList;

class RouterFactory
{
    use Nette\StaticClass;


    /**
     * @param int $year
     * @param bool $isArchivationProcess
     * @return Nette\Application\IRouter
     * @throws Nette\InvalidArgumentException
     */
    public static function createRouter($year, $isArchivationProcess)
    {
        $router = new RouteList;

        // Admin
        $adminRouter = new RouteList('Admin');
        $adminRouter[] = new Route('admin/<presenter>/<action>[/<id>]', 'Dashboard:default');
        $router[] = $adminRouter;

        $apiRouter = new RouteList('Api');
        $apiRouter[] = new Route('api/<presenter>/<action>');
        $router[] = $apiRouter;

        $requiredWhenArchive = $isArchivationProcess ? '!' : '';

        //Custom routes
        $router[] = new Route('[' . $requiredWhenArchive . $year . '/]kontakt', 'Homepage:contact');
        $router[] = new Route('[!' . $year . '/]o-akci', 'Homepage:history');
        $router[] = new Route('[!' . $year . '/]partneri', 'Homepage:partners');
        $router[] = new Route('prihlaseni', 'Sign:in');
        $router[] = new Route('odhlaseni', 'Sign:out');
        $router[] = new Route('obnovit-heslo', 'Sign:resetPassword');
        $router[] = new Route('obnovit-heslo/potvrzeni', 'Sign:resetPasswordConfirm');
        $router[] = new Route('obnovit-heslo/odeslano', 'Sign:resetPasswordSent');
        $router[] = new Route('registrace', 'Sign:conferee');
        $router[] = new Route('vypsani-prednasky', 'Sign:talk');
        $router[] = new Route('[!' . $year . '/]prednasky', 'Conference:talks');
        $router[] = new Route('[!' . $year . '/]prednaska', 'Conference:talks', Route::ONE_WAY);
        $router[] = new Route('[!' . $year . '/]prednaska/<id \d+>', 'Conference:talkDetail');
        $router[] = new Route('[!' . $year . '/]prednasky/<id \d+>', 'Conference:talkDetail', Route::ONE_WAY);
        $router[] = new Route('[!' . $year . '/]program', 'Conference:program');
        $router[] = new Route('profil', 'User:profil');
        $router[] = new Route('upravit-profil', 'User:conferee');
        $router[] = new Route('upravit-prednasku', 'User:talk');

        // Simple page unger Homepage presenter
        $router[] = new Route('<action>', 'Homepage:default');

        //Facebook API endpoints (important for strict FB API policy)
        $router[] = new Route('sign/facebook', [
            'presenter' => 'Sign',
            'action' => 'federatedLogin',
            'platform' => 'facebook',
        ]);
        $router[] = new Route('sign/facebook/callback', [
            'presenter' => 'Sign',
            'action' => 'federatedCallback',
            'platform' => 'facebook',
        ]);

        // Universal router to process another requests
        $router[] = new Route('<presenter>/<action>[/<id \d+>]');

        return $router;
    }
}
