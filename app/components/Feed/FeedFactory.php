<?php

namespace App\Components\Feed;

use App\Model\WordpressPostReader;

class FeedFactory
{
    /**
     * FeedFactory constructor.
     * @param WordpressPostReader $postReader
     */
    public function __construct(private readonly WordpressPostReader $postReader)
    {
    }


    /**
     * @return FeedControl
     */
    public function create(): \App\Components\Feed\FeedControl
    {
        return new FeedControl($this->postReader);
    }
}
