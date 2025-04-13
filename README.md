Web Kolínského barcampu
======================

Web Kolínského barcampu (https://www.barcampkolin.cz/)


Instalace na localhost
----------------------

Po stažení repozitáře naisntalujte závislosti:

    composer install

Vytvořte soubor `app/config/config.local.neon` (není verzován v Gitu). Může být i prázdný.

Úpravy JS a CSS
---------------

Pro úpravy JavaScriptových souborů a nebo stylů je potřeba nainstalovat závislosti pro generátor:

    npm install -g bower
    npm install
    bower install
    
Po úpravě souborů v `assets/` zavolejte:

    grunt

a vygenerují se soubory:
- `www/js/main.js`
- `www/js/admin.js`
- `www/css/main.css`
- `www/css/admin.css`

které obsahují veškeré scripty a styly stránek. Tyto soubory jsou součástí repozitáře, takže je lze
rovnou použít. 
 

Spuštění webového serveru
-------------------------
Spusťte Docker 

    docker-composer up -d

Na stránce `http://localhost:8080` by se měl objevit aktuální web.

Nastavení cronu
--------------

Vy systému není univerzální cron, který by obsluhoval všechny služby, ale pro každý cronem obsluhovaný
job je samostatné volání cronu. 

Volání cronu je přes HTTPS REST API a je chráněno API tokenem, který si lze vygenerovat v administraci.
Samotné volání lze pak zajistit externí službou nebo přes `curl` či `wget`.

Volání cronu musí být metodou `POST` a musí obsahovat HTTP hlavičku `authtoken` jejíž hodnotou bude
jeden platný token.

Tělem odpovědi je vždy JSON s povinnou hodnotou `status`, který označuje úspěšnost akce. 

Seznam cronů:

### Cron pro automatický posun harmonogramu

- Endpoint: `/api/schedule/step-next`
- Parametry: (bez parametrů)


Požadavky pro běh
-----------------

PHP 8.3 nebo vyšší, Mysql, Git, Unzip. 

V PHP jsou potřeba rozšření: `mysqli`, `pdo_mysql`.


Požadavky pro vývoj
-----------------

Composer, NPM 


Deploy na server
----------------

Pro automatický deploy změn na produkční server je potřeba mít nainstalovaný composer a v něm **globálně** nainstalovaný
balíček [`ftp-deployment`](https://github.com/dg/ftp-deployment):

```shell
composer global require dg/ftp-deployment
```

Údaje pro připojení k FTP serveru nejsou verzovány a je potřeba je lokálně nakonfigurovat v souboru
`.deployment-credentials.php` v kořenovém adresáři repozitáře a to ve tvaru: 

```php
<?php

return [
     'remote' => <fill in your FTP url - e.g. ftps://example.com/path/to/your/dir>,
     'user' => <fill in your FTP username>,
     'password' => <fill in your FTP password>
];
```

### Spuštění deploye

Deploy lze spustit připravenými scripty:

- `bin/deploy.sh` - pro nasazení na produkční server
- `bin/deploy-dry.sh` - pro výpis souborů, které by se nasadily na produkční server


License
-------
- Web: The MIT License (MIT)
- Nette: New BSD License or GPL 2.0 or 3.0
- Další závislosti podle zveřejněných licení
