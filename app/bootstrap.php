<?php /** @noinspection PhpUnhandledExceptionInspection */

use Nette\Bootstrap\Configurator;
use Redbitcz\DebugMode;
use Tracy\Debugger;

require __DIR__ . '/../vendor/autoload.php';

$tempDir = __DIR__ . '/../temp';

$configurator = new Configurator;

$debugModeEnabler = (new DebugMode\Enabler($tempDir));
$debugModeDetector = new DebugMode\Detector(DebugMode\Detector::MODE_FULL, $debugModeEnabler);
$configurator->setDebugMode($debugModeDetector->isDebugMode());

$configurator->enableTracy(__DIR__ . '/../log', 'pan@jakubboucek.cz');
Debugger::getLogger()->emailSnooze = '1 hour';

$configurator->setTimeZone('Europe/Prague');
$configurator->setTempDirectory($tempDir);
$configurator->addServices(['debugModeDetector' => $debugModeDetector]);

$configurator->createRobotLoader()
    ->addDirectory(__DIR__ . '/Orm')
    ->addDirectory(__DIR__ . '/Presenters')
    ->addDirectory(__DIR__ . '/AdminModule/Presenters')
    ->addDirectory(__DIR__ . '/ApiModule/Presenters')
    ->register();

$configurator->addConfig(__DIR__ . '/config/config.neon');
$configurator->addConfig(__DIR__ . '/config/config.local.neon');

$container = $configurator->createContainer();

return $container;
