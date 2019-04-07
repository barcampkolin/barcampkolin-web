<?php

namespace App\Model;

use InvalidArgumentException;
use Nette\Database\Context;
use Nette\Database\ForeignKeyConstraintViolationException;
use Nette\Database\ResultSet;
use Nette\Database\Table\ActiveRow;
use Nette\Database\Table\Selection;
use Nette\InvalidStateException;
use Traversable;

class PartnersManager
{

    const TABLE_GROUPS = 'partner_groups';
    const TABLE_PARTNERS = 'partners';

    /**
     * @var Context
     */
    private $database;


    /**
     * PartnersManager constructor.
     * @param Context $database
     */
    public function __construct(Context $database)
    {
        $this->database = $database;
    }


    /**
     * @param bool $onlyEnabled
     * @return array
     */
    public function getReport($onlyEnabled = true)
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


    /**
     * @param bool $onlyEnabled
     * @return ResultSet
     */
    public function getAll($onlyEnabled = true)
    {
        $enabledPart = '';
        if ($onlyEnabled) {
            $enabledPart = 'WHERE `p`.`enabled` AND `pg`.`enabled`';
        }

        $sql = <<<EOT
SELECT `pg`.`id` AS `group_id`, `pg`.`name` AS `group_name`, `pg`.`height` AS `group_height`, `p`.`id`, `p`.`name`, `p`.`url`, `p`.`picture_url`, `p`.`height`
FROM `partners` AS `p`
LEFT JOIN `partner_groups` AS `pg` ON `p`.`group_id` = `pg`.`id`
$enabledPart
ORDER BY `pg`.`order`, `p`.`order`; 
EOT;

        return $this->database->query($sql);
    }


    /**
     * @param bool $onlyEnabled
     * @return Selection
     */
    public function getGroups($onlyEnabled = true)
    {
        $selection = $this->database->table(self::TABLE_GROUPS)
            ->order('order');

        if ($onlyEnabled == true) {
            $selection->where('enabled', 1);
        }

        return $selection;
    }


    /**
     * @param bool $onlyEnabled
     * @return Selection
     */
    public function getPartners($onlyEnabled = true)
    {
        $selection = $this->database->table(self::TABLE_PARTNERS)
            ->order('order');

        if ($onlyEnabled == true) {
            $selection->where('enabled', 1);
        }

        return $selection;
    }


    /**
     * @param int $id
     * @return ActiveRow
     * @throws PartnerNotFound
     */
    public function getPartnerById($id)
    {
        $row = $this->database->table(self::TABLE_PARTNERS)->get($id);
        if (!$row instanceof ActiveRow) {
            throw new PartnerNotFound("partner with id $id not found");
        }
        return $row;
    }


    /**
     * @param Traversable $values
     * @param int|null $id
     * @throws InvalidStateException
     * @throws PartnerNotFound
     */
    public function insertUpdatePartner($values, $id = null)
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


    /**
     * @param ActiveRow $item
     * @param ActiveRow|null $prevItem
     * @param ActiveRow|null $nextItem
     * @throws InvalidArgumentException
     */
    public function changePartnersOrder(ActiveRow $item, ActiveRow $prevItem = null, ActiveRow $nextItem = null)
    {
        $this->sort(self::TABLE_PARTNERS, $item, $prevItem, $nextItem);
    }


    /**
     * @param $id
     * @return ActiveRow
     * @throws PartnerNotFound
     */
    public function getGroupById($id)
    {
        $row = $this->database->table(self::TABLE_GROUPS)->get($id);
        if (!$row instanceof ActiveRow) {
            throw new PartnerNotFound("Partner group with id $id not found");
        }
        return $row;
    }


    /**
     * @param Traversable $values
     * @param int|null $id
     * @throws PartnerNotFound
     * @throws InvalidStateException
     */
    public function insertUpdateGroup($values, $id = null)
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


    /**
     * @param string $table
     * @param int $default
     * @return int
     */
    protected function getNextOrderValue($table, $default = 0)
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


    /**
     * @param ActiveRow|null $item
     * @param ActiveRow|null $prevItem
     * @param ActiveRow|null $nextItem
     * @throws InvalidArgumentException
     */
    public function changeGroupsOrder(ActiveRow $item, ActiveRow $prevItem = null, ActiveRow $nextItem = null)
    {
        $this->sort(self::TABLE_GROUPS, $item, $prevItem, $nextItem);
    }


    /**
     * @param ActiveRow $group
     * @throws ForeignKeyConstraintViolationException
     */
    public function delete(ActiveRow $group)
    {
        $group->delete();
    }


    /**
     * DANGER remove all partners
     * @param bool $really
     * @throws InvalidArgumentException
     */
    public function purgeAll($really = false)
    {
        if ($really !== true) {
            throw new InvalidArgumentException('Purging all items MUST be confirmed');
        }

        $this->database->query('DELETE FROM `' . self::TABLE_PARTNERS . '`;');
    }


    /**
     * @param $table
     * @param ActiveRow $item
     * @param ActiveRow|null $prevItem
     * @param ActiveRow|null $nextItem
     * @throws InvalidArgumentException
     */
    private function sort($table, ActiveRow $item, ActiveRow $prevItem = null, ActiveRow $nextItem = null)
    {
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
