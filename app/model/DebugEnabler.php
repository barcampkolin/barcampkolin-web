<?php

namespace App\Model;

use Nette\InvalidStateException;
use Nette\Utils\Random;

class DebugEnabler
{
    /**
     * @var string
     */
    private static $workDir = null;

    private static string $tokenFile = '/debug/token.bin';

    private static string $debugCookieName = 'debug-token';


    /**
     * @return bool
     */
    public static function isDebug(): bool
    {
        return self::isDebugByEnv() || self::isDebugByToken();
    }


    /**
     * @return bool
     */
    public static function isDebugByEnv(): bool
    {
        return intval(getenv('NETTE_DEBUG')) === 1;
    }


    /**
     * @return bool
     */
    public static function isDebugByToken(): bool
    {
        return isset($_COOKIE[self::$debugCookieName])
            && ($_COOKIE[self::$debugCookieName] === self::getToken());
    }


    /**
     * @return string
     */
    private static function getToken()
    {
        $tokenFile = self::getTokenFile();
        if (!file_exists($tokenFile)) {
            return self::createToken($tokenFile);
        }

        return file_get_contents($tokenFile);
    }


    /**
     * @return string
     */
    private static function getTokenFile(): string
    {
        if (self::$workDir === null) {
            throw new InvalidStateException('WorkDir is not defined');
        }
        $tokenFile = self::$workDir . self::$tokenFile;
        return $tokenFile;
    }


    /**
     * @return string
     */
    private static function generateToken(): string
    {
        return Random::generate(30);
    }


    /**
     * @param string $workDir
     */
    public static function setWorkDir($workDir): void
    {
        self::$workDir = $workDir;
    }


    /**
     *
     */
    public static function turnOn(): void
    {
        $token = self::getToken();
        setcookie(
            self::$debugCookieName,
            $token,
            ['expires' => time() + 3600, 'path' => '/', 'domain' => '', 'secure' => true, 'httponly' => true]
        );
    }


    /**
     *
     */
    public static function turnOff(): void
    {
        setcookie(
            self::$debugCookieName,
            '',
            ['expires' => time() - 3600, 'path' => '/', 'domain' => '', 'secure' => true, 'httponly' => true]
        );
    }


    /**
     * @param string $tokenFile
     * @return string
     */
    private static function createToken(string $tokenFile): string
    {
        $token = self::generateToken();
        $dirname = dirname($tokenFile);
        if (!file_exists($dirname)) {
            mkdir($dirname, 0777, true);
        }
        file_put_contents($tokenFile, $token);
        return $token;
    }
}
