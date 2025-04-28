<?php

namespace App\Model;

class ApiTokenManager
{
    public function __construct(
        private readonly string $secretKey,
        private readonly ConfigManager $configManager
    ) {
    }


    public function validateToken(?string $token): void
    {
        if (empty($token) || !$this->isTokenValid($token)) {
            throw new TokenInvalidException('Token invalid', 403);
        }
    }


    private function isTokenValid(string $token): bool
    {
        $hash = hash_hmac('sha256', $token, $this->secretKey);

        $hashes = $this->getTokenHashes();

        foreach ($hashes as $hashItem) {
            if ($hashItem['value'] === $hash) {
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
