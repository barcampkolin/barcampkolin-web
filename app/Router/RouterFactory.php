<?php

namespace App\Router;

use App\Model\ArchiveManager;
use Nette;
use Nette\Application\Routers\Route;
use Nette\Application\Routers\RouteList;

class RouterFactory
{
    use Nette\StaticClass;


    /**
     * @param ArchiveManager $archiveManager
     * @return Nette\Application\IRouter
     * @throws Nette\InvalidArgumentException
     */
    public static function createRouter(ArchiveManager $archiveManager): \Nette\Application\Routers\RouteList
    {
        $router = new RouteList;

        // Admin
        $adminRouter = new RouteList('Admin');
        $adminRouter->addRoute('admin/<presenter>/<action>[/<id>]', 'Dashboard:default');
        $router[] = $adminRouter;

        $apiRouter = new RouteList('Api');
        $apiRouter->addRoute('api/<presenter>/<action>');
        $router[] = $apiRouter;

        $year = $archiveManager->getCurrentYear();
        $requiredWhenArchive = $archiveManager->isArchivationProcess() ? '!' : '';

        //Custom routes
        $router->addRoute('[' . $requiredWhenArchive . $year . '/]kontakt', 'Homepage:contact');
        $router->addRoute('[!' . $year . '/]o-akci', 'Homepage:history');
        $router->addRoute('[!' . $year . '/]partneri', 'Homepage:partners');
        $router->addRoute('prihlaseni', 'Sign:in');
        $router->addRoute('odhlaseni', 'Sign:out');
        $router->addRoute('obnovit-heslo', 'Sign:resetPassword');
        $router->addRoute('obnovit-heslo/potvrzeni', 'Sign:resetPasswordConfirm');
        $router->addRoute('obnovit-heslo/odeslano', 'Sign:resetPasswordSent');
        $router->addRoute('registrace', 'Sign:conferee');
        $router->addRoute('vypsani-prednasky', 'Sign:talk');
        $router->addRoute('[!' . $year . '/]prednasky', 'Conference:talks');
        $router->addRoute($year.'/prednaska', 'Conference:talks', RouteList::ONE_WAY);
        $router->addRoute($year . '/prednaska/<id \d+>', 'Conference:talkDetail');
        $router->addRoute($year.'/prednasky/<id \d+>', 'Conference:program', RouteList::ONE_WAY);
        $router->addRoute('[!' . $year . '/]program', 'Conference:program');
        $router->addRoute('profil', 'User:profil');
        $router->addRoute('upravit-profil', 'User:conferee');
        $router->addRoute('upravit-prednasku', 'User:talk');
        $router->addRoute('archiv', 'Archived:list');
        $router->addRoute('privacy-policy', 'PrivacyPolicy:default');

        $router[] = self::createArchiveRoutes($archiveManager->getArchivedYears());

        $router->addRoute('[' . $requiredWhenArchive . $year . ']', 'Homepage:default');

        // Simple page unger Homepage presenter
        $router->addRoute('<action>', 'Homepage:default');

        // Universal router to process another requests
        $router->addRoute('<presenter>/<action>[/<id \d+>]');

        return $router;
    }


    /**
     * @param array $archiverYears
     * @return RouteList
     * @throws Nette\InvalidArgumentException
     */
    private static function createArchiveRoutes(array $archiverYears): \Nette\Application\Routers\RouteList
    {
        $archiveRouter = new RouteList();

        foreach ($archiverYears as $year) {
            $archiveRouter->addRoute($year . '[/<page [-a-z0-9/]+>]', [
                'presenter' => 'Archived',
                'action' => 'render',
                'year' => $year,
            ]);
        }

        return $archiveRouter;
    }


}
