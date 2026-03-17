<?php

namespace App\Model;

use Nette\SmartObject;

/**
 * @property-read $sets
 */
class EnumeratorManager
{
    use SmartObject;

    public const string SET_FAQS = 'faqs';
    public const string SET_TALK_DURATIONS = 'talk_durations';
    public const string SET_TALK_CATEGORIES = 'talk_categories';
    public const string SET_TALK_ROOMS = 'talk_rooms';

    private static array $sets = [
        self::SET_FAQS,
        self::SET_TALK_DURATIONS,
        self::SET_TALK_CATEGORIES,
        self::SET_TALK_ROOMS,
    ];


    public function __construct(
        private readonly ConfigManager $config
    ) {
    }


    public static function validateSet(string $set): void
    {
        if (!in_array($set, self::$sets, true)) {
            throw new InvalidEnumeratorSetException("Set '$set' is invalid");
        }
    }


    public function get(string $set): array
    {
        self::validateSet($set);
        return (array)$this->config->get($set, []);
    }


    public function getPairs(string $set): array
    {
        self::validateSet($set);
        $arr = (array)$this->config->get($set, []);
        $pairs = [];
        foreach ($arr as $item) {
            $pairs[$item['key']] = $item['value'];
        }
        return $pairs;
    }


    public function set(string $set, array $faqs): void
    {
        self::validateSet($set);
        $this->config->set($set, $faqs);
    }
}
