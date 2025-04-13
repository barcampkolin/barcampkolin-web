<?php /** @noinspection PhpUnhandledExceptionInspection */

use Nette\Bootstrap\Configurator;
use Redbitcz\DebugMode\Detector;
use Tracy\Debugger;

require __DIR__ . '/../vendor/autoload.php';

$configurator = new Configurator;

$debugMode = Detector::detect();
$configurator->setDebugMode($debugMode);

$configurator->enableTracy(__DIR__ . '/../log', 'pan@jakubboucek.cz');
Debugger::getLogger()->emailSnooze = '1 hour';

$configurator->setTimeZone('Europe/Prague');
$configurator->setTempDirectory(__DIR__ . '/../temp');

$configurator->createRobotLoader()
    ->addDirectory(__DIR__)
    ->register();

$configurator->addConfig(__DIR__ . '/config/config.neon');
$configurator->addConfig(__DIR__ . '/config/config.local.neon');

$container = $configurator->createContainer();

return $container;
