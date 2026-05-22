<?php

declare(strict_types=1);

namespace App\Model\Entity;

use Nette\NotImplementedException;

trait DeprecatedArrayAccess
{
    public function offsetExists(mixed $offset): bool
    {
        $fields = get_object_vars($this);
        return array_key_exists($offset, $fields);
    }

    #[\Deprecated(message: "Array access is deprecated. Use property access instead.")]
    public function offsetGet(mixed $offset): mixed
    {
        if (!$this->offsetExists($offset)) {
            throw new \OutOfBoundsException("Offset '$offset' does not exist.");
        }

        return $this->{$offset};
    }

    public function offsetSet(mixed $offset, mixed $value): void
    {
        throw new NotImplementedException();
    }

    public function offsetUnset(mixed $offset): void
    {
        throw new NotImplementedException();
    }
}
