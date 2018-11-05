<?php

namespace Test;

use Nette\Utils\DateTime;
use Tester;
use Tester\Assert;

require __DIR__ . '/bootstrap.php';



class DateTimeShiftTest extends Tester\TestCase
{

    public function testSomething()
    {
        $from = '2018-05-12T09:00:00+02:00';
        $to = '2019-05-11T09:00:00+02:00';

        $d1 = DateTime::from($from);
        $d2 = DateTime::from($to);

        $diff = $d1->diff($d2, true);

        $d3 = $d1->add($diff);

        $testValue = $d3->jsonSerialize();

        Assert::equal($to, $testValue);
    }
}



$test = new DateTimeShiftTest();
$test->run();
