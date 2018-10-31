<?php

namespace App\Model;

use Nette\Http\Request;
use Nette\Utils\DateTime;
use Nette\Utils\JsonException;

/**
 * Class LocalArchivableStoragePrefixFactory
 * @package App\Model
 *
 * This class prepare factory of Storage prefix for:
 * - local storage (storeg inside directory tree in this app)
 * - public storage (content is directly accessible via webserver lake this app)
 *
 * For paramaters always use trailing "/" on begin and never use trailing "/" at end
 *
 * ## Example: ##
 * URL parts:
 *
 * http://localhost:8001/public/static/upload/2018/profile-images
 * \___________________/\_____________/\_____/\__/\_____________/
 *     Dynamic base       $urlPrefix     |     |          |
 * \_________________________________/   |     |          |
 *             URL base                  |     |          |
 *                                       |     |          |
 *         $pathYearPrefix          <-----     |          |
 *         Current year (by config) <-----------          |
 *         $pathYearSuffix          <----------------------
 *
 * Storage parts:
 * It has only $storageBase - it's used whole without dynamic prefix
 */
class LocalArchivableStoragePrefixFactory
{
    /**
     * @var string
     */
    private $storageBase;
    /**
     * @var string
     */
    private $urlBase;
    /**
     * @var int
     */
    private $currentYear;


    /**
     * @param string $storageBase Absolute path (without trailing /)
     * @param string $urlPrefix Relative URL from project root
     * @param ConfigManager $config
     * @param Request $httpRequest
     */
    public function __construct($storageBase, $urlPrefix, ConfigManager $config, Request $httpRequest)
    {
        $this->storageBase = $storageBase;
        $this->urlBase = rtrim($httpRequest->getUrl()->getBaseUrl(), '/') . '/' . $urlPrefix;

        $this->currentYear = $this->loadCurrentYear($config);
    }


    /**
     * @param string|null $pathYearPrefix
     * @param string|null $pathYearSuffix
     * @return StoragePrefix
     */
    public function create($pathYearPrefix, $pathYearSuffix)
    {
        $pathPrefix = $pathYearPrefix . $this->currentYear . $pathYearSuffix;
        return new StoragePrefix($this->storageBase, $this->urlBase, $pathPrefix);
    }


    /**
     * @param ConfigManager $config
     * @return int
     */
    private function loadCurrentYear(ConfigManager $config)
    {
        $currentYear = (new DateTime)->format('Y');
        try {
            return (int)$config->get('dates.currentYear', $currentYear);
        } catch (JsonException $e) {
            return $currentYear;
        }
    }


}
