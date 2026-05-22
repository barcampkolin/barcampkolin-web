# CLAUDE.md

Pokyny pro práci na webu Kolínského barcampu. Zaznamenává jen to, co se vymyká
běžné konvenci Nette projektu. Obecné věci viz README.md a aktivované skills.

## Doporučené skills

Tento projekt je PHP + Nette aplikace. Pro práci je vhodné mít aktivované:

- plugin **`nette`** – skills pro Nette/Latte/NEON/Nextras ORM atd.
- plugin **`phpstorm-plugin`** – PHP code review a integrace s IDE.

Pozor: skill `nette:frontend-development` předpokládá **Vite**, ten se zde
**nepoužívá** – viz sekce Frontend níže. Jeho doporučení na tento projekt
neaplikuj.

## Jazyk

README.md i tento CLAUDE.md jsou psané **česky** (na rozdíl od kódu – ten včetně
komentářů anglicky, viz globální instrukce).

## Architektura ročníků (klíčový koncept)

Web se každoročně "rotuje" – starý ročník se archivuje, běží nový.

- **Ročník = rok = první segment URL.** Stránky ročníku mají rok v URL (`/2026/program`),
  systémové stránky (přihlášení apod.) ne. Router při chybějícím roce přesměruje
  na aktuální ročník.
- **Aktuální ročník** je uložen v DB konfiguraci pod klíčem `dates.currentYear`
  (ne v NEON, ne v souboru). Čte se přes `ArchiveManager::getCurrentYear()`.
- **Archivované ročníky** se servírují jako statické HTML. `ArchiveManager`
  vyrenderuje stránky ročníku do souborů a `App\Presenters\ArchivedPresenter`
  je už jen vypisuje (`TextResponse`). Archivovaným stránkám se odstraňuje
  hlavička CSP, protože jsou statické.
- Během archivace je nastavená cookie `_in_archivation`
  (`ArchiveManager::isArchivationProcess()`), která mění chování routeru –
  v `RouterFactory` zpřísňuje volitelnost ročníkového segmentu (`!` prefix).

## Konfigurace v databázi

Vedle NEON konfigurace existuje **runtime konfigurace v DB tabulce `config`**
(klíč → JSON hodnota), spravovaná přes `App\Model\ConfigManager` a admin UI.
Drží mj. `dates.currentYear`, `archive.years`, termíny akce. Při změnách dat
ročníku se sahá sem, ne do NEON.

## Plánovač a feature-flagy (časté nedorozumění)

Stav webu (které funkce jsou zapnuté – registrace účastníků, zápis přednášek,
hlasování, zobrazení programu apod.) řídí feature-flagy. **Tyto flagy se
nepřepínají dynamicky** porovnáváním aktuálního času při každém requestu –
i když to tak na první pohled vypadá.

**Jak to funguje ve skutečnosti:**

- Efektivní (živé) hodnoty flagů jsou **staticky uložené v DB tabulce `config`**
  pod klíči `features.*` (definované v `App\Model\EventInfoProvider`). Při
  requestu je web čte přes `EventInfoProvider::getFeatures()`, který vychází
  z `ConfigManager` – ten celou tabulku načte **jediným `SELECT`em** a drží
  v paměti. Žádné date-related výpočty na request-path neprobíhají.
- `App\Model\ScheduleManager` je definiční a plánovací vrstva. Drží **kroky
  harmonogramu** (`talks`, `vote`, `program`, `event`, `report`) a pro každý
  krok **plán** požadovaného stavu flagů. Plán je uložený v `config` pod
  oddělenými klíči `schedule.<krok>.<flag>` – tedy odděleně od živých hodnot.
- Aktivace kroku (`ScheduleManager::changeCurrentStep()`) je **jednorázová
  zapisovací operace**: nastaví ukazatel `schedule.currentStep` a metodou
  `propagateConfigsByStep()` **zkopíruje plánované hodnoty kroku do živých
  klíčů `features.*`**. Od té chvíle web jede podle nově zapsaných hodnot.

**Důsledky, na které je nutné dbát:**

- Živé flagy lze kdykoliv **ručně přepnout** (admin UI / `config`) nezávisle na
  plánu – plán harmonogramu se tím nemění a naopak.
- Krok se reálně posune **jen přes cron endpoint** `POST /api/schedule/step-next`
  (`App\ApiModule\Presenters\SchedulePresenter::actionStepNext()`). To je
  **jediné místo, které porovnává datumy**: vezme následující krok, a pokud má
  zapnutý příznak `auto` a jeho plánované datum už nastalo (porovnání po
  půlnoci), zavolá `changeCurrentStep()`. Bez zavolání cronu k automatickému
  posunu nikdy nedojde.
- Při rotaci ročníku `ArchiveManager::archive()` harmonogram resetuje
  (`changeCurrentStep(null)`).

## Dvě datové vrstvy nad jedním PDO

Aplikace používá **současně** Nextras ORM (doménové entity `App\Orm\*`)
i Nette Database Explorer (`ConfigManager` nad tabulkou `config`).

Sdílejí jedno PDO spojení: Nextras Dbal dostává PDO z Nette Database přes
vlastní driver `App\Dbal\RawPdoMysqlDriver` (viz `config.neon`, sekce
`nextras.dbal`). Nezakládej druhé spojení.

## Frontend (assety)

- Build je **webpack + Less** (ne Vite, ne SCSS). Příkazy: `npm run build`
  (produkce), `npm run build:dev`, `npm run build:watch`.
- Assety jsou **per ročník** v `assets/####/`, builderem se generují do
  `www/static/####/`. Vygenerované soubory jsou **verzované** (commitují se).
- `currentYear` ve `webpack.config.js` je nutné při rotaci ročníku **ručně
  sesynchronizovat** s `dates.currentYear` v DB. Jde o samostatný zdroj pravdy.
- V kódu assetů odkazuj relativně; pro absolutní cesty použij `currentYear` (JS)
  nebo `@staticBase` (Less).
- Design stojí na **zastaralé verzi Bootstrap CSS** (3.x). Upgrade na novější
  verzi není snadný – je na něj navázaný rozsáhlý vlastní design, který je
  s novou verzí Bootstrapu nekompatibilní. Bootstrap neupgraduj bez výslovného
  zadání; počítej s tím, že nové verze frameworku se zde nepoužijí.

## Lint, statická analýza, testy

- `composer run lint` – PHP + Latte + NEON lint; `composer run phpstan`
  (úroveň 1, bez konfiguračního souboru). CI (`.github/workflows`) spouští
  pouze tyto kontroly.
- Testy v `tests/` (Nette Tester `.phpt`) jsou **pahýl – nepoužívají se**.
  Nejsou v CI, nemají composer skript a `nette/tester` ani není závislostí.
  Nepiš proti nim nové testy a nespoléhej na ně; ber je jako mrtvý kód.

## Databázové migrace

Bez migračního nástroje. Schéma je v `.install/structure.sql`, povinná data
v `.install/base-data.sql`. Dílčí změny jsou datované SQL soubory v `.install/`
(např. `2026-03-13-...-phone-to-talk-table.sql`), aplikují se ručně.

## Cron

Žádný systémový cron – joby se volají přes HTTPS REST API (`/api/...`),
metodou `POST` s HTTP hlavičkou `authtoken` (token z administrace).

## Lokální vývoj a deploy

- Lokální běh: Docker image `jakubboucek/docker-lamp-devstack`
  (`docker compose up -d`). DB: host `127.0.0.1` (ne `localhost`), port `33060`,
  user `root`, heslo `devstack`, databáze `default`.
- Před prvním během je nutné vytvořit prázdný `app/config/config.local.neon`
  (neverzovaný, drží produkční DB přístupy) a adresáře `temp/` a `log/`.
- Deploy přes FTP nástrojem `dg/ftp-deployment` (`bin/deploy.sh`,
  `bin/deploy-dry.sh`), konfigurace v `.deployment.php`.
