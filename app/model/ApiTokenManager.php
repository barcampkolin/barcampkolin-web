<?php

namespace App\Model;

class ApiTokenManager
{
    /**
     * ApiTokenManager constructor.
     * @param string $secretKey
     * @param ConfigManager $configManager
     */
    public function __construct(
        private $secretKey,
        private readonly ConfigManager $configManager
    ) {
    }


    /**
     * @param $token
     * @throws TokenInvalidException
     * @throws \Nette\Utils\JsonException
     */
    public function validateToken($token): void
    {
        if (empty($token) || !$this->isTokenValid($token)) {
            throw new TokenInvalidException('Token invalid');
        }
    }


    /**
     * @param $token
     * @return bool
     * @throws \Nette\Utils\JsonException
     */
    private function isTokenValid($token): bool
    {
        $hash = hash_hmac('sha256', (string)$token, $this->secretKey);

        $hashes = $this->getTokenHashes();

        foreach ($hashes as $hashItem) {
            if ($hashItem['value'] == $hash) {
                return true;
            }
        }

        return false;
    }


    /**
     * @return mixed
     * @throws \Nette\Utils\JsonException
     */
    public function getTokenHashes()
    {
        $hashes = $this->configManager->get('api.token.hashes', []);

        return $hashes;
    }

}
