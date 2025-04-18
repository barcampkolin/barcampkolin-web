<?php

namespace App\Model;

use Nette\SmartObject;

/**
 * Class EnumeratorManager
 * @package App\Model
 *
 * @property-read $sets
 */
class EnumeratorManager
{
    use SmartObject;

    const SET_FAQS = 'faqs';
    const SET_TALK_DURATIONS = 'talk_durations';
    const SET_TALK_CATEGORIES = 'talk_categories';
    const SET_TALK_ROOMS = 'talk_rooms';

    private static array $sets = [
        self::SET_FAQS,
        self::SET_TALK_DURATIONS,
        self::SET_TALK_CATEGORIES,
        self::SET_TALK_ROOMS,
    ];


    /**
     * EnumeratorManager constructor.
     * @param ConfigManager $config
     */
    public function __construct(
        private ConfigManager $config
    ) {
    }


    /**
     * @param string $set
     * @throws InvalidEnumeratorSetException
     */
    public static function validateSet($set): void
    {
        if (!in_array($set, self::$sets, true)) {
            throw new InvalidEnumeratorSetException("Set \"$set\" is invalid");
        }
    }


    /**
     * @param string $set
     * @return array
     * @throws InvalidEnumeratorSetException
     * @throws \Nette\Utils\JsonException
     */
    public function get($set): array
    {
        self::validateSet($set);
        return (array)$this->config->get($set, []);
    }


    /**
     * @param string $set
     * @return array
     * @throws InvalidEnumeratorSetException
     * @throws \Nette\Utils\JsonException
     */
    public function getPairs($set): array
    {
        self::validateSet($set);
        $arr = (array)$this->config->get($set, []);
        $pairs = [];
        foreach ($arr as $item) {
            $pairs[$item['key']] = $item['value'];
        }
        return $pairs;
    }


    /**
     * @param string $set
     * @param array $faqs
     * @throws InvalidEnumeratorSetException
     * @throws \Nette\Utils\JsonException
     */
    public function set($set, $faqs): void
    {
        self::validateSet($set);
        $this->config->set($set, $faqs);
    }
}
