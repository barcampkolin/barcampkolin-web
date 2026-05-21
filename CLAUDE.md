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
