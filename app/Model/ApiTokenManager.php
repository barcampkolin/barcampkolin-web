<?php

declare(strict_types=1);

namespace App\Model;

readonly class ApiTokenManager
{
    public function __construct(
        private string $secretKey,
        private ConfigManager $configManager
    ) {
    }


    public function validateToken(?string $token): void
    {
        if (empty($token) || !$this->isTokenValid($token)) {
            throw new TokenInvalidException('Token invalid');
        }
    }


    private function isTokenValid(string $token): bool
    {
        $hash = hash_hmac('sha256', $token, $this->secretKey);

        $hashes = $this->getTokenHashes();

        foreach ($hashes as $hashItem) {
            if (hash_equals($hashItem['value'], $hash)) {
                return true;
            }
        }

        return false;
    }


    public function getTokenHashes():array
    {
        return $this->configManager->get('api.token.hashes', []);
    }
}
