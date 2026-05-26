<?php

namespace App\Orm\Talk;

use App\Orm\Conferee\Conferee;
use App\Orm\Program\Program;
use Nette\Utils\Json;
use Nette\Utils\JsonException;
use Nextras\Orm\Entity\Entity;
use Nextras\Orm\Relationships\OneHasMany;

/**
 * @property int $id                                {primary}
 * @property Conferee|null $conferee                {m:1 Conferee::$talk}
 * @property OneHasMany|Program[]|null $program     {1:m Program::$talk}
 * @property string $title
 * @property string|null $description
 * @property string|null $purpose
 * @property int $enabled                           {default 1}
 * @property int $votes                             {default 0}
 * @property int $voteCoefficient                   {default 0}
 * @property string|null $category
 * @property string|null $company
 * @property string|null $notes
 * @property string|null $extended
 * @property \DateTimeImmutable $created            {default now}
 */
class Talk extends Entity
{
    public function getExpandedExtensions(?string $item = null, mixed $default = null): mixed
    {
        $extended = Json::decode($this->extended, forceArrays: true);
        if (is_null($item)) {
            return $extended;
        } else {
            return $extended[$item] ?? $default;
        }
    }


    public function setExpandedExtenstios(mixed $value, ?string $item = null): void
    {
        if (is_null($item)) {
            $extended = $value;
        } else {
            $extended = $this->getExpandedExtensions();
            $extended[$item] = $value;
        }

        $this->extended = Json::encode($extended);
    }


    private function getLinks(): array
    {
        return $this->getExpandedExtensions('links', []);
    }


    private function setLinks(array $links): void
    {
        $this->setExpandedExtenstios($links, 'links');
    }


    public function getLinksByType($type)
    {
        $links = $this->getLinks();
        return $links[$type] ?? [];
    }


    public function setLinksByType($type, array $items): void
    {
        $links = $this->getLinks();
        $links[$type] = $items;
        $this->setLinks($links);
    }

}
