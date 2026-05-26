<?php

namespace App\Model;

use InvalidArgumentException;
use Nette\Database\Explorer;
use Nette\Database\ResultSet;
use Nette\Database\Table\ActiveRow;
use Nette\Database\Table\Selection;
use Nette\Utils\ArrayHash;

class PartnersManager
{
    private const string TABLE_GROUPS = 'partner_groups';
    private const string TABLE_PARTNERS = 'partners';


    public function __construct(
        private readonly Explorer $database
    ) {
    }


    public function getReport(bool $onlyEnabled = true): array
    {
        $groups = [];
        foreach ($this->getAll($onlyEnabled) as $item) {
            if (!isset($groups[$item->group_id])) {
                $groups[$item->group_id] = [
                    'id' => $item->group_id,
                    'name' => $item->group_name,
                    'partners' => [],
                ];
            }

            if ($item->height === null && $item->group_height) {
                $item->height = $item->group_height;
            }
            $groups[$item->group_id]['partners'][$item->id] = $item;
        }

        return $groups;
    }


    public function getAll(bool $onlyEnabled = true): ResultSet
    {
        $enabledPart = '';
        if ($onlyEnabled) {
            $enabledPart = 'WHERE `p`.`enabled` AND `pg`.`enabled`';
        }

        $sql = <<<SQL
            SELECT `pg`.`id` AS `group_id`, `pg`.`name` AS `group_name`, `pg`.`height` AS `group_height`, `p`.`id`, `p`.`name`, `p`.`url`, `p`.`picture_url`, `p`.`height`
            FROM `partners` AS `p`
            LEFT JOIN `partner_groups` AS `pg` ON `p`.`group_id` = `pg`.`id`
            $enabledPart
            ORDER BY `pg`.`order`, `p`.`order`; 
            SQL;

        return $this->database->query($sql);
    }


    public function getGroups(bool $onlyEnabled = true): Selection
    {
        $selection = $this->database->table(self::TABLE_GROUPS)
            ->order('order');

        if ($onlyEnabled) {
            $selection->where('enabled', 1);
        }

        return $selection;
    }


    public function getPartners(bool $onlyEnabled = true): Selection
    {
        $selection = $this->database->table(self::TABLE_PARTNERS)
            ->order('order');

        if ($onlyEnabled) {
            $selection->where('enabled', 1);
        }

        return $selection;
    }


    public function getPartnerById(int $id): ActiveRow
    {
        $row = $this->database->table(self::TABLE_PARTNERS)->get($id);
        if (!$row instanceof ActiveRow) {
            throw new PartnerNotFound("Partner with id $id not found");
        }
        return $row;
    }


    public function insertUpdatePartner(ArrayHash|array $values, ?int $id = null): void
    {
        if ($id) {
            $this->getPartnerById($id)->update($values);
        } else {
            if (!isset($values['order'])) {
                $values['order'] = $this->getNextOrderValue(self::TABLE_PARTNERS);
            }
            $this->database->table(self::TABLE_PARTNERS)->insert($values);
        }
    }


    public function changePartnersOrder(ActiveRow $item, ?ActiveRow $prevItem = null, ?ActiveRow $nextItem = null): void
    {
        $this->sort(self::TABLE_PARTNERS, $item, $prevItem, $nextItem);
    }


    public function getGroupById(int $id): ActiveRow
    {
        $row = $this->database->table(self::TABLE_GROUPS)->get($id);
        if (!$row instanceof ActiveRow) {
            throw new PartnerNotFound("Partner group with id $id not found");
        }
        return $row;
    }


    public function insertUpdateGroup(ArrayHash|array $values, ?int $id = null): void
    {
        if ($id) {
            $this->getGroupById($id)->update($values);
        } else {
            if (!isset($values['order'])) {
                $values['order'] = $this->getNextOrderValue(self::TABLE_GROUPS);
            }
            $this->database->table(self::TABLE_GROUPS)->insert($values);
        }
    }


    protected function getNextOrderValue(string $table, int $default = 0): int
    {
        $latestValue = $this->database->table($table)
            ->select('order')
            ->order('order DESC')
            ->limit(1)
            ->fetchField();

        if ($latestValue === false) {
            $latestValue = $default;
        }

        return $latestValue + 100;
    }


    public function changeGroupsOrder(ActiveRow $item, ?ActiveRow $prevItem = null, ?ActiveRow $nextItem = null): void
    {
        $this->sort(self::TABLE_GROUPS, $item, $prevItem, $nextItem);
    }


    public function delete(ActiveRow $group): void
    {
        $group->delete();
    }


    /**
     * DANGER remove all partners
     */
    public function purgeAll(bool $really = false): void
    {
        if ($really !== true) {
            throw new InvalidArgumentException('Purging all items MUST be confirmed');
        }

        $this->database->query('DELETE FROM `' . self::TABLE_PARTNERS . '`;');
    }


    private function sort(
        string $table,
        ActiveRow $item,
        ?ActiveRow $prevItem = null,
        ?ActiveRow $nextItem = null
    ): void {
        if (!in_array($table, [self::TABLE_GROUPS, self::TABLE_PARTNERS], true)) {
            throw new InvalidArgumentException("Table name $table is invalid");
        }

        $itemOrder = (int)$item->order;

        if ($prevItem) {
            $this->database->query(
                "UPDATE `$table` 
                SET `order` = `order` - 1
                WHERE `order` <= " . (int)$prevItem->order . "
                AND `order` > $itemOrder;"
            );
        }
        if ($nextItem) {
            $this->database->query(
                "UPDATE `$table` 
                SET `order` = `order` + 1
                WHERE `order` >= " . (int)$nextItem->order . "
                AND `order` < $itemOrder;"
            );
        }

        if ($prevItem) {
            $itemOrder = $prevItem->order;
        } elseif ($nextItem) {
            $itemOrder = $nextItem->order;
        } else {
            $itemOrder = 1;
        }

        $this->database->query(
            "UPDATE `$table` 
                SET `order` = $itemOrder
                WHERE `id` = " . $item->id . ';'
        );
    }
}
