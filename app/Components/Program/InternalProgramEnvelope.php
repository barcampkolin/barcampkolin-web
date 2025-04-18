<?php

namespace App\Components\Program;

use App\Orm\Program\Program;

/**
 * Class InternalProgramEnvelope
 * @package App\components\Program
 * @property-read string|null $category
 */
class InternalProgramEnvelope extends InternalProgram
{
    /**
     * @var string
     */
    private $defaultTitle;


    /**
     * InternalProgramEnvelope constructor.
     * @param Program $program
     */
    public function __construct(
        private readonly Program $program
    ) {
    }


    /**
     * @return \DateInterval
     */
    public function getTime()
    {
        return $this->program->time;
    }


    /**
     * @return int
     */
    public function getDuration()
    {
        return $this->program->duration;
    }


    /**
     * @return string|null
     */
    public function getCategory()
    {
        return $this->program->talk ? $this->program->talk->category : $this->program->category;
    }


    /**
     * @return null|string
     */
    public function getStyle()
    {
        return $this->program->style;
    }


    /**
     * @return int
     */
    public function getTalkId()
    {
        return $this->program->talk ? $this->program->talk->id : null;
    }


    /**
     * @return null|string
     */
    public function getTitle()
    {
        if (empty($this->program->title) && $this->program->talk) {
            return $this->program->talk->title;
        } elseif (empty($this->program->title)) {
            return $this->defaultTitle;
        } else {
            return $this->program->title;
        }
    }


    /**
     * @return bool
     */
    public function isTitleOverridden(): bool
    {
        return !empty($this->program->title);
    }


    /**
     * @return null|string
     */
    public function getSpeaker()
    {
        if (empty($this->program->speaker) && $this->program->talk) {
            return $this->program->talk->conferee->name;
        } else {
            return $this->program->speaker;
        }
    }


    /**
     * @return null|string
     */
    public function getType()
    {
        return $this->program->type;
    }


    /**
     * @param string $defaultTitle
     */
    public function setDefaultTitle($defaultTitle): void
    {
        $this->defaultTitle = $defaultTitle;
    }
}
