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

Na stránce `http://localhost:8001` by se měl objevit aktuální web.

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

PHP 5.6 nebo vyšší, Mysql 5 nebo vyšší, Git, Unzip. 

V PHP jsou potřeba rozšření: mysqli, pdo_mysql.


Požadavky pro vývoj
-----------------

Composer, NPM 


License
-------
- Web: The MIT License (MIT)
- Nette: New BSD License or GPL 2.0 or 3.0
- Další závislosti podle zveřejněných licení
