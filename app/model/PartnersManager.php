<?php

namespace App\Model;

use Nette\Database\Context;

class PartnersManager
{

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
     * @return \Nette\Database\ResultSet
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
     * @return \Nette\Database\Table\Selection
     */
    public function getGroups($onlyEnabled = true)
    {
        $selection = $this->database->table('partner_groups')
            ->order('order');

        if ($onlyEnabled == true) {
            $selection->where('enabled', 1);
        }

        return $selection;
    }


    /**
     * @param int $id
     * @return false|\Nette\Database\Table\ActiveRow
     */
    public function getPartnerById($id)
    {
        return $this->database->table('partners')->get($id);
    }


    /**
     * @param \Traversable $values
     * @param int|null $id
     */
    public function insertUpdatePartner($values, $id = null)
    {
        if ($id) {
            $this->getPartnerById($id)->update($values);
        } else {
            $this->database->table('partners')->insert($values);
        }
    }


    /**
     * @param $id
     * @return false|\Nette\Database\Table\ActiveRow
     */
    public function getGroupById($id)
    {
        return $this->database->table('partner_groups')->get($id);
    }


    /**
     * @param \Traversable $values
     * @param int|null $id
     */
    public function insertUpdateGroup($values, $id = null)
    {
        if ($id) {
            $this->getPartnerById($id)->update($values);
        } else {
            $this->database->table('partner_groups')->insert($values);
        }
    }
}
