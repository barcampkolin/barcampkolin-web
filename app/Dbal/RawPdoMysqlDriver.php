<?php

declare(strict_types=1);

namespace App\Dbal;

use Nextras\Dbal\Drivers\PdoMysql\PdoMysqlDriver;
use Nextras\Dbal\Drivers\PdoMysql\PdoMysqlResultNormalizerFactory;
use Nextras\Dbal\ILogger;
use PDO;

class RawPdoMysqlDriver extends PdoMysqlDriver
{
    public function connect(array $params, ILogger $logger): void
    {
        $pdo = $params['pdo'] ?? null;

        if (!$pdo instanceof PDO) {
            $type = get_debug_type($pdo);
            throw new \InvalidArgumentException(__CLASS__ . " expects PDO instance at `pdo` parameter, got '{$type}'.");
        }

        if ($pdo->getAttribute(PDO::ATTR_DRIVER_NAME) !== 'mysql') {
            $driverName = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME);
            throw new \InvalidArgumentException(
                __CLASS__ . " expects PDO instance with MySQL driver, got '{$driverName}'."
            );
        }

        $this->connection = $pdo;
        $this->logger = $logger;

        // Workaround to fill private $this->resultNormalizerFactory
        (function ($factory) {
            $this->resultNormalizerFactory = $factory;
        })->bindTo($this, PdoMysqlDriver::class)(
            new PdoMysqlResultNormalizerFactory($this)
        );
    }

}
