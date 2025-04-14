<?php

namespace App\Model;

use Nette\SmartObject;
use Nette\Utils\ArrayHash;
use Nette\Utils\DateTime;

class EventInfoProvider
{
    use SmartObject;

    public const CURRENT_YEAR = 'dates.currentYear';

    public const COUNTS_CONFEREE = 'counts.conferee';
    public const COUNTS_TALKS = 'counts.talks';
    public const COUNTS_TALKS_LIMIT = 'counts.talks.limit';
    public const COUNTS_WORKSHOPS = 'counts.workshops';
    public const COUNTS_HALLS = 'counts.halls';
    public const COUNTS_WARMUPPARTY = 'counts.warmupparty';
    public const COUNTS_AFTERPARTY = 'counts.afterparty';
    public const DATE_TALKS = 'schedule.talks.date';
    public const DATE_VOTE = 'schedule.vote.date';
    public const DATE_EVENT = 'schedule.event.date';
    public const DATE_PROGRAM = 'schedule.program.date';
    public const DATE_REPORT = 'schedule.report.date';
    public const FEATURE_CONFEREE = 'features.registerConferee.enabled';
    public const FEATURE_TALK = 'features.registerTalk.enabled';
    public const FEATURE_TALK_EDIT = 'features.editTalk.enabled';
    public const FEATURE_TALK_ORDER = 'features.talk.order';
    public const FEATURE_VOTE = 'features.voteTalk.enabled';
    public const FEATURE_SHOW_VOTE = 'features.showVoteTalk.enabled';
    public const FEATURE_PROGRAM = 'features.showProgram.enabled';
    public const FEATURE_REPORT = 'features.showReport.enabled';
    public const URL_FACEBOOK = 'url.social.facebook';
    public const URL_TWITTER = 'url.social.twitter';
    public const URL_YOUTUBE = 'url.social.youtube';
    public const URL_INSTAGRAM = 'url.social.instagram';
    public const URL_WAY_TO_EVENT = 'url.post.howToWay';
    public const URL_OG_IMAGE = 'url.igImage';
    public const URL_PARTNER_PROPOSAL = 'url.partnersProposal';
    public const SCHEDULE_VISUAL_DATE_BEGIN = 'schedule.visualDate.begin';
    public const SCHEDULE_VISUAL_DATE_END = 'schedule.visualDate.end';


    public function __construct(
        private readonly ConfigManager $config,
        private readonly ConfereeManager $confereeManager
    ) {
    }


    public function getDates(): ArrayHash
    {
        return ArrayHash::from([
            'year' => (int)$this->config->get(self::CURRENT_YEAR, (new DateTime())->format('Y')),

            'talks' => DateTime::from($this->config->get(self::DATE_TALKS)),
            'vote' => DateTime::from($this->config->get(self::DATE_VOTE)),
            'program' => DateTime::from($this->config->get(self::DATE_PROGRAM)),
            'event' => DateTime::from($this->config->get(self::DATE_EVENT)),
            'report' => DateTime::from($this->config->get(self::DATE_REPORT)),
            'scheduleBegin' => DateTime::from($this->config->get(self::SCHEDULE_VISUAL_DATE_BEGIN)),
            'scheduleEnd' => DateTime::from($this->config->get(self::SCHEDULE_VISUAL_DATE_END)),
        ]);
    }


    public function getUrls(): ArrayHash
    {
        return ArrayHash::from([
            'facebook' => $this->config->get(self::URL_FACEBOOK),
            'twitter' => $this->config->get(self::URL_TWITTER),
            'youtube' => $this->config->get(self::URL_YOUTUBE),
            'instagram' => $this->config->get(self::URL_INSTAGRAM),
            'way' => $this->config->get(self::URL_WAY_TO_EVENT),
            'ogImage' => $this->config->get(self::URL_OG_IMAGE),
            'partnerProposal' => $this->config->get(self::URL_PARTNER_PROPOSAL),
        ]);
    }


    public function getCounts(): ArrayHash
    {
        return ArrayHash::from([
            'conferee' => $this->config->get(self::COUNTS_CONFEREE),
            'conferee_registered' => $this->getConfereeRegisteredCount(),
            'conferee_left' => $this->getConfereeAvailableCount(),
            'talks' => $this->config->get(self::COUNTS_TALKS),
            'talks_limit' => $this->config->get(self::COUNTS_TALKS_LIMIT),
            'workshops' => $this->config->get(self::COUNTS_WORKSHOPS),
            'halls' => $this->config->get(self::COUNTS_HALLS),
            'warmupparty' => $this->config->get(self::COUNTS_WARMUPPARTY),
            'afterparty' => $this->config->get(self::COUNTS_AFTERPARTY),
        ]);
    }


    public function getFeatures(): ArrayHash
    {
        $features = ArrayHash::from([
            'conferee' => $this->isConfereeRegistrationAvailable(),
            'conferee_enabled' => $this->config->get(self::FEATURE_CONFEREE),
            'talks' => $this->config->get(self::FEATURE_TALK),
            'talks_edit' => $this->config->get(self::FEATURE_TALK_EDIT),
            'talks_order' => $this->config->get(self::FEATURE_TALK_ORDER),
            'vote' => $this->config->get(self::FEATURE_VOTE),
            'show_vote' => $this->config->get(self::FEATURE_SHOW_VOTE),
            'program' => $this->config->get(self::FEATURE_PROGRAM),
            'report' => $this->config->get(self::FEATURE_REPORT),
        ]);

        $features['talks_show'] = $features['talks'] || $features['vote'] || $features['show_vote'];

        return $features;
    }


    /**
     * @return int Count of registered conferee count (without removed)
     */
    public function getConfereeRegisteredCount(): int
    {
        return $this->confereeManager->getActiveCount();
    }


    /**
     * @return int Count of left available conferee tickets
     */
    public function getConfereeAvailableCount(): int
    {
        $confereeLimit = $this->config->get(self::COUNTS_CONFEREE);
        $confereeCount = $this->getConfereeRegisteredCount();

        return max(0, $confereeLimit - $confereeCount);
    }


    /**
     * @return bool True if conferee registration available (enabled & free tickets)
     */
    public function isConfereeRegistrationAvailable(): bool
    {
        return $this->config->get(self::FEATURE_CONFEREE, false) && $this->getConfereeAvailableCount() > 0;
    }
}
