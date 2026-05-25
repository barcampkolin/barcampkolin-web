<?php

namespace App\Components\Program;

use DateInterval;

class InternalProgramVirtual extends InternalProgram
{
    private string $title = '';
    private ?string $speaker = null;
    private ?string $style = null;


    public function __construct(
        private string $type,
        private DateInterval $time,
        private int $duration
    ) {
    }


    public function getTalkId(): null
    {
        return null;
    }


    public function getTime(): DateInterval
    {
        return $this->time;
    }


    public function setTime(DateInterval $time): void
    {
        $this->time = $time;
    }


    public function getDuration(): int
    {
        return $this->duration;
    }


    public function setDuration(int $duration): void
    {
        $this->duration = $duration;
    }


    public function getStyle(): ?string
    {
        return $this->style;
    }


    public function setStyle(?string $style): void
    {
        $this->style = $style;
    }


    public function getType(): string
    {
        return $this->type;
    }


    public function setType(string $type): void
    {
        $this->type = $type;
    }


    public function getTitle(): string
    {
        return $this->title;
    }


    public function setTitle(string $title): void
    {
        $this->title = $title;
    }


    public function isTitleOverridden(): bool
    {
        return true;
    }


    public function getSpeaker():?string
    {
        return $this->speaker;
    }


    public function setSpeaker(?string $speaker): void
    {
        $this->speaker = $speaker;
    }
}
