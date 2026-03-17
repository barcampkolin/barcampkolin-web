<?php

declare(strict_types=1);

namespace App\Model;

use Nette\Utils\ArrayHash;

class OrgListModel
{
    private const string ListConfigKey = 'orgs.list';
    public const string LastUpdateUrlKeyConfigKey = 'orgs.lastUpdate.url';

    public function __construct(
        private readonly ConfigManager $configManager,
    ) {
    }

    public function getLastUpdateUrl(): ?string
    {
        return $this->configManager->get(self::LastUpdateUrlKeyConfigKey);
    }

    public function getOrgs(): iterable
    {
        $orgs = $this->configManager->get(self::ListConfigKey, []);

        foreach ($orgs as $org) {
            yield ArrayHash::from($org);
        }
    }

    public function update(array $orgs, ?string $lastUpdateUrl = null): void
    {
        $this->configManager->set(self::ListConfigKey, $orgs);

        if ($lastUpdateUrl !== null) {
            $this->configManager->set(self::LastUpdateUrlKeyConfigKey, $lastUpdateUrl);
        }
    }
}
