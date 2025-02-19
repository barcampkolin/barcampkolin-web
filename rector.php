<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;

return RectorConfig::configure()
    ->withPaths([
        __DIR__ . '/app',
        __DIR__ . '/tests',
        __DIR__ . '/www',
    ])
    // uncomment to reach your current PHP version
    ->withPhpSets()
    ->withTypeCoverageLevel(1000)
  ->withCodeQualityLevel(0)
    ->withDeadCodeLevel(0);
