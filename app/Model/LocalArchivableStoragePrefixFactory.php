<?php

namespace App\Model;

use Nette\Http\Request;

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
readonly class LocalArchivableStoragePrefixFactory implements IStoragePrefixFactory
{
    private string $urlBase;
    private int $currentYear;


    /**
     * @param string $storageBase Absolute path (without trailing /)
     * @param string $urlPrefix Relative URL from project root
     */
    public function __construct(
        private string $storageBase,
        string $urlPrefix,
        ArchiveManager $archiveManager,
        Request $httpRequest
    ) {
        $this->urlBase = rtrim($httpRequest->getUrl()->getBaseUrl(), '/') . '/' . ltrim($urlPrefix, '/');

        $this->currentYear = $archiveManager->getCurrentYear();
    }


    public function create(?string $pathYearPrefix, ?string $pathYearSuffix): StoragePrefix
    {
        $pathPrefix = $pathYearPrefix . $this->currentYear . $pathYearSuffix;
        return new StoragePrefix($this->storageBase, $this->urlBase, $pathPrefix);
    }
}
