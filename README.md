Web Kolínského barcampu
======================

Web Kolínského barcampu (https://www.barcampkolin.cz/)


Instalace na localhost
----------------------

Po stažení repozitáře naisntalujte závislosti:

```shell
composer install
```

Vytvořte soubor `app/config/config.local.neon` (není verzován v Gitu). Může být i prázdný.

Úpravy JS a CSS (assety)
------------------------

Při práci s assety (tj. JS + CSS) počítejte prosím s tím, že každý ročník by měl být co nejvíce nezávislý a mít vlastní
assety pro daný ročník. Umožní to pak věrně archivovat stránky z původních let jako statické soubory, aniž by to omezovalo
rozvoj a úpravy v dalších letech. Proto jsou všechny assets uloženy v adresáři `assets/####`, kde `####` je rok konání.
Odkazy v CSS a JS souborech pak tvořte pokud možno relativně a pokud to nebude možné, využijte připravenou proměnnou
`currentYear` (v JS, obsahuje pouze rok) a nebo `@staticBase` (v Less, obsahuje cestu k assetům pro daný ročník).

Pro každý ročník je potřeba vygenerovat assety znovu, protože v sobě mají zkompilovaný ročník. Aktuální ročník změníte
upravou proměnné `currentYear` v souboru `webpack.config.js`.

Pro úpravy assetů je potřeba nainstalovat závislosti pro generátor:

```shell
npm install
```

Po úpravě souborů v `assets/` zavolejte:

```shell
npm run build:prod
```

a vygenerují se soubory (místo `2025` se použije aktuální rok):

```shell
- `www/static/2025/js/main.js`
- `www/static/2025/js/admin.js`
- `www/static/2025/css/main.css`
- `www/static/2025/css/admin.css`
```

které obsahují veškeré scripty a styly stránek. Tyto soubory jsou součástí repozitáře, takže je lze
rovnou použít. 

Spuštění webového serveru
-------------------------
Spusťte Docker 

```shell
docker compose up -d
```

Na stránce `http://localhost:8080` by se měl objevit aktuální web.

Nastavení cronu
--------------

V systému není univerzální cron, který by obsluhoval všechny služby, ale pro každý cronem obsluhovaný
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

V PHP jsou potřeba rozšření: `pdo_mysql`.


Požadavky pro vývoj
-----------------

Composer, NPM

Požadavky na webhosting
-----------------------

- všechny pozadavky uvedené v kapitole [Požadavky pro běh](#požadavky-pro-běh).
- webserver musí mít povolený `mod_rewrite`.
- webserver musí mít `DOCUMENT_ROOT` směrovaný do adresáře `www/`, nikoliv do rootu repozitáře.

> [!WARNING]
> Pokud váš webhosting nemá možnost nastavit `DOCUMENT_ROOT` do adresáře `www/`, zvolte si jiný webhosting
> a nepokoušejte se tento neodstatek vyřešit přes `.htaccess` soubor. Jedná se o zásadní bezpečnostní aspekt.\
> Více informací: https://nette.org/cs/security-warning

- v rootu aplikace musí být vytvořeny adresáře `temp/` a `log/` a musí mít nastaveny práva pro zápis (tyto adresáře
    nejsou součástí deploye, je proto potřeba je vytvořit ručně).
- na serveru musí existovat soubor [`app/config/config.local.neon`] (klidně prázdný pro začátek).

Aplikace potřebuje pro běh připojení k MySQL (nebo MariaDB) databázi a v ní připravené tabulky, jejich struktura je
v souboru [`.install/structure.sql`](.install/structure.sql). Konfigurační tabulka musí obsahovat základní data, která
jsou vypsána v souboru [`.install/base-data.sql`](.install/base-data.sql).

Budete potřebovat do aplikace zadat přístupové údaje k databázi. Nezadávejte je do hlavního konfiguračního souboru,
protože byste si tím rozbili lokální vývoj. K tomu slouží soubor `config.local.neon`, který není verzován a ani
není součástí deploye, takže se vaše lokální verze nebude propisovat na server – což ale znamená, že jej na server
musíte nahrát ručně. Doporučená struktura tohoto souboru je připravena v souboru
[`config.local-sample.neon`](app/config/config.local-sample.neon).

Deploy na server přes FTP
-------------------------

Tento návod přepokládá, že k serveru přistupujete přes FTP. Pokud používáte jinou metodu (SCP, SFTP, rsync apod.),
můžete tento návod přeskočit a jako podklad pro vlastní deploy script použijte soubor [`.deployment.php`](.deployment.php),
zejména seznam ignorovaných cest, které se nemají nasazovat na server.

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
- The MIT License (MIT)
- Další závislosti podle zveřejněných licení
