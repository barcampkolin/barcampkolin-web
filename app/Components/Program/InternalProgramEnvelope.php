<?php

namespace App\Components\Program;

use App\Orm\Program\Program;
use DateInterval;

/**
 * @property-read string|null $category
 */
class InternalProgramEnvelope extends InternalProgram
{
    private string $defaultTitle;


    public function __construct(
        private readonly Program $program
    ) {
    }


    public function getTime(): DateInterval
    {
        return $this->program->time;
    }


    public function getDuration(): int
    {
        return $this->program->duration;
    }


    public function getCategory(): ?string
    {
        return $this->program->talk ? $this->program->talk->category : $this->program->category;
    }


    public function getStyle(): ?string
    {
        return $this->program->style;
    }


    public function getTalkId(): ?int
    {
        return $this->program->talk->id ?? null;
    }


    public function getProgramId(): int
    {
        return $this->program->id;
    }


    public function getProgram(): Program
    {
        return $this->program;
    }


    public function getTitle(): string
    {
        if (empty($this->program->title) && $this->program->talk) {
            return $this->program->talk->title;
        }

        if (empty($this->program->title)) {
            return $this->defaultTitle;
        }

        return $this->program->title;
    }


    public function isTitleOverridden(): bool
    {
        return !empty($this->program->title);
    }


    public function getSpeaker(): string
    {
        if (empty($this->program->speaker) && $this->program->talk) {
            return $this->program->talk->conferee->name;
        }

        return $this->program->speaker;
    }


    public function getType(): string
    {
        return $this->program->type;
    }


    public function setDefaultTitle(string $defaultTitle): void
    {
        $this->defaultTitle = $defaultTitle;
    }
}
