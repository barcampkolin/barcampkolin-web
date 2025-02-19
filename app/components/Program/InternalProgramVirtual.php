<?php

namespace App\Components\Program;

/**
 * Class InternalProgramVirtual
 * @package App\Components\Program
 */
class InternalProgramVirtual extends InternalProgram implements IInternalProgram
{
    /**
     * @var string|null
     */
    private $title;
    /**
     * @var string|null
     */
    private $speaker;
    /**
     * @var string
     */
    private $style;


    /**
     * InternalProgramVirtual constructor.
     * @param $type
     * @param \DateInterval $time
     * @param $duration
     * @param string $type
     * @param int $duration
     */
    public function __construct(private $type, private \DateInterval $time, private $duration)
    {
    }


    /**
     * @return string
     */
    public function getTalkId()
    {
        return null;
    }


    /**
     * @return \DateInterval
     */
    public function getTime(): \DateInterval
    {
        return $this->time;
    }


    /**
     * @param \DateInterval $time
     */
    public function setTime(\DateInterval $time): void
    {
        $this->time = $time;
    }


    /**
     * @return int
     */
    public function getDuration()
    {
        return $this->duration;
    }


    /**
     * @param int $duration
     */
    public function setDuration($duration): void
    {
        $this->duration = $duration;
    }


    /**
     * @return string|null
     */
    public function getStyle()
    {
        return $this->style;
    }


    /**
     * @param string|null $style
     */
    public function setStyle($style): void
    {
        $this->style = $style;
    }


    /**
     * @return mixed
     */
    public function getType()
    {
        return $this->type;
    }


    /**
     * @param mixed $type
     */
    public function setType($type): void
    {
        $this->type = $type;
    }


    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }


    /**
     * @param mixed $title
     */
    public function setTitle($title): void
    {
        $this->title = $title;
    }


    /**
     * @return bool
     */
    public function isTitleOverridden(): bool
    {
        return true;
    }


    /**
     * @return mixed
     */
    public function getSpeaker()
    {
        return $this->speaker;
    }


    /**
     * @param mixed $speaker
     */
    public function setSpeaker($speaker): void
    {
        $this->speaker = $speaker;
    }
}
