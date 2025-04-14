<?php

namespace App\Model;

use Nette\Database;
use Nette\Utils\Json;

class ConfigManager
{
    private const TABLE_NAME = 'config';
    private const COLUMN_ID = 'id';
    private const COLUMN_VALUE = 'value';

    private ?array $configs = null;


    public function __construct(
        private readonly Database\Explorer $database
    ) {
    }


    public function get(string $key, $default = null)
    {
        $configs = $this->load();

        return $configs[$key] ?? $default;
    }


    private function load(bool $force = false): array
    {
        if ($this->configs !== null || $force) {
            return $this->configs;
        }

        $this->configs = [];

        $configs = $this->database->table(self::TABLE_NAME);

        foreach ($configs as $row) {
            $key = $row[self::COLUMN_ID];
            $value = $row[self::COLUMN_VALUE];
            $this->configs[$key] = Json::decode($value, Json::FORCE_ARRAY);
        }

        return $this->configs;
    }


    public function set(string $key, $value): void
    {
        $this->load();

        $this->configs[$key] = $value;

        $this->saveOne($key, $value);
    }


    private function saveOne(string $key, $value): void
    {
        $json = Json::encode($value);

        $values = [
            [
                'id' => $key,
                'value' => $json,
            ]
        ];

        $updateStatement = [
            'value' => new Database\SqlLiteral("VALUES(`value`)")
        ];

        $this->database->query(
            'INSERT INTO ?name ?values ON DUPLICATE KEY UPDATE ?;',
            self::TABLE_NAME,
            $values,
            $updateStatement
        );
    }
}
