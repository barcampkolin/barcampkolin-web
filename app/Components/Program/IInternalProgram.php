<?php

namespace App\Components\Program;

interface IInternalProgram
{
    public function getTitle(): string;


    public function isTitleOverridden(): bool;


    public function getSpeaker(): ?string;


    public function getType(): string;


    public function getTime(): \DateInterval;


    public function getDuration(): int;


    public function getStyle(): ?string;
}
