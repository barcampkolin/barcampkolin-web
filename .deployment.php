<?php

/*
 * Recommended deployment configuration file:
 *
 * return [
 *     'remote' => <fill in your FTP url - e.g. ftps://example.com/path/to/your/dir>,
 *     'user' => <fill in your FTP username>,
 *     'password' => <fill in your FTP password>
 * ];
 */
$credentials = require __DIR__ . '/.deployment-credentials.php';

return [
    'Production' => [
        'remote' => $credentials['remote'],
        'user' => $credentials['user'],
        'password' => $credentials['password'],
        'local' => __DIR__,
        'test' => false,
        'ignore' => '
            .git
            .gitignore
            .DS_Store
            /.bowerrc
            /.deployment.php
            /.deployment-credentials.php
            /.docker
            /.idea
            /.install
            /.rsync-exclude
            /app/config/config.local.neon
            /assets
            /bin
            /bower.json
            /composer.json
            /composer.lock
            /docker-compose.yml
            /Gruntfile.js
            /log
            /LICENSE
            /node_modules
            /package.json
            /package-lock.json
            /rclone.exclude
            /README.md
            /rector.php
            /temp
            /tests
            /www/upload
            /www/archive
        ',
        'allowDelete' => true,
        //'after' => ['https://www.barcampkolin.cz/deployment.php?after'],
        'purge' => ['/temp/cache'],
    ],
    'tempDir' => __DIR__ . '/temp',
    'colors' => true,
    'log' => __DIR__ . '/log/deployment.log'
];
