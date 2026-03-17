<?php

namespace App\Model;

use App\Model\Entity\EventCounts;
use App\Model\Entity\EventDates;
use App\Model\Entity\EventFeatures;
use App\Model\Entity\EventUrls;
use DateTimeImmutable;
use Nette\SmartObject;

class EventInfoProvider
{
    use SmartObject;

    public const string CURRENT_YEAR = 'dates.currentYear';

    public const string COUNTS_CONFEREE = 'counts.conferee';
    public const string COUNTS_TALKS = 'counts.talks';
    public const string COUNTS_TALKS_LIMIT = 'counts.talks.limit';
    public const string COUNTS_WORKSHOPS = 'counts.workshops';
    public const string COUNTS_HALLS = 'counts.halls';
    public const string COUNTS_WARMUPPARTY = 'counts.warmupparty';
    public const string COUNTS_AFTERPARTY = 'counts.afterparty';
    public const string DATE_TALKS = 'schedule.talks.date';
    public const string DATE_VOTE = 'schedule.vote.date';
    public const string DATE_EVENT = 'schedule.event.date';
    public const string DATE_PROGRAM = 'schedule.program.date';
    public const string DATE_REPORT = 'schedule.report.date';
    public const string FEATURE_CONFEREE = 'features.registerConferee.enabled';
    public const string FEATURE_TALK = 'features.registerTalk.enabled';
    public const string FEATURE_TALK_EDIT = 'features.editTalk.enabled';
    public const string FEATURE_TALK_ORDER = 'features.talk.order';
    public const string FEATURE_VOTE = 'features.voteTalk.enabled';
    public const string FEATURE_SHOW_VOTE = 'features.showVoteTalk.enabled';
    public const string FEATURE_PROGRAM = 'features.showProgram.enabled';
    public const string FEATURE_REPORT = 'features.showReport.enabled';
    public const string URL_FACEBOOK = 'url.social.facebook';
    public const string URL_TWITTER = 'url.social.twitter';
    public const string URL_YOUTUBE = 'url.social.youtube';
    public const string URL_INSTAGRAM = 'url.social.instagram';
    public const string URL_WAY_TO_EVENT = 'url.post.howToWay';
    public const string URL_OG_IMAGE = 'url.igImage';
    public const string URL_PARTNER_PROPOSAL = 'url.partnersProposal';
    public const string SCHEDULE_VISUAL_DATE_BEGIN = 'schedule.visualDate.begin';
    public const string SCHEDULE_VISUAL_DATE_END = 'schedule.visualDate.end';
    public const string SCHEDULE_CURRENT_STEP = 'schedule.currentStep';


    public function __construct(
        private readonly ConfigManager $config,
        private readonly ConfereeManager $confereeManager
    ) {
    }


    public function getDates(): EventDates
    {
        return new EventDates(
            year: (int)$this->config->get(self::CURRENT_YEAR, new DateTimeImmutable()->format('Y')),
            talks: new DateTimeImmutable($this->config->get(self::DATE_TALKS)),
            vote: new DateTimeImmutable($this->config->get(self::DATE_VOTE)),
            program: new DateTimeImmutable($this->config->get(self::DATE_PROGRAM)),
            event: new DateTimeImmutable($this->config->get(self::DATE_EVENT)),
            report: new DateTimeImmutable($this->config->get(self::DATE_REPORT)),
            scheduleBegin: new DateTimeImmutable($this->config->get(self::SCHEDULE_VISUAL_DATE_BEGIN)),
            scheduleEnd: new DateTimeImmutable($this->config->get(self::SCHEDULE_VISUAL_DATE_END)),
        );
    }


    public function getUrls(): EventUrls
    {
        return new EventUrls(
            facebook: $this->config->get(self::URL_FACEBOOK),
            twitter: $this->config->get(self::URL_TWITTER),
            youtube: $this->config->get(self::URL_YOUTUBE),
            instagram: $this->config->get(self::URL_INSTAGRAM),
            way: $this->config->get(self::URL_WAY_TO_EVENT),
            ogImage: $this->config->get(self::URL_OG_IMAGE),
            partnerProposal: $this->config->get(self::URL_PARTNER_PROPOSAL),
        );
    }


    public function getCounts(): EventCounts
    {
        return new EventCounts(
            conferee: $this->config->get(self::COUNTS_CONFEREE),
            conferee_registered: $this->getConfereeRegisteredCount(),
            conferee_left: $this->getConfereeAvailableCount(),
            talks: $this->config->get(self::COUNTS_TALKS),
            talks_limit: $this->config->get(self::COUNTS_TALKS_LIMIT),
            workshops: $this->config->get(self::COUNTS_WORKSHOPS),
            halls: $this->config->get(self::COUNTS_HALLS),
            warmupparty: $this->config->get(self::COUNTS_WARMUPPARTY),
            afterparty: $this->config->get(self::COUNTS_AFTERPARTY),
        );
    }


    public function getFeatures(): EventFeatures
    {
        $talks = $this->config->get(self::FEATURE_TALK);
        $vote = $this->config->get(self::FEATURE_VOTE);
        $show_vote = $this->config->get(self::FEATURE_SHOW_VOTE);
        $talks_show = $talks || $vote || $show_vote;

        return new EventFeatures(
            conferee: $this->isConfereeRegistrationAvailable(),
            conferee_enabled: $this->config->get(self::FEATURE_CONFEREE),
            talks: $talks,
            talks_edit: $this->config->get(self::FEATURE_TALK_EDIT),
            talks_order: $this->config->get(self::FEATURE_TALK_ORDER),
            vote: $vote,
            show_vote: $show_vote,
            program: $this->config->get(self::FEATURE_PROGRAM),
            report: $this->config->get(self::FEATURE_REPORT),
            talks_show: $talks_show,
        );
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
