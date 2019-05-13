<?php
error_reporting(0);
ini_set('display_errors',0);
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
$time = date("H:i");
//$time = '10:45';
$_sal = $_GET['sal'];
$arr = [
    'saly' => [
        'sal1' => ['name' => 'Sál SimpleShop (suterén)'],
        'sal2' => ['name' => 'Sál SimpleTicket (přízemí)'],
        'sal3' => ['name' => 'Sál Vyfakturuj (2. patro)'],
    ],
    'harmonogram' => [
        ['start' => '09:10','end' => '09:30',
            'sal1' => ['speaker' => '','talkName' => 'Úvodní slovo'],
        ],
        ['start' => '09:30','end' => '10:00',
            'sal1' => ['speaker' => 'Honza Kulda','talkName' => 'Neboj se a dělej změny','type' => 'osobniRozvoj'],
            'sal2' => ['speaker' => 'Josef Řezníček','talkName' => 'Jak vytvořit trvalý zdroj zákazníků pomocí obsahu + kniha zdarma pro vás','type' => 'byznys'],
            'sal3' => ['speaker' => 'Daniel Nytra','talkName' => '365 dní s chatovacím robotem (FB Messenger)','type' => 'tech','doporucuje' => 'https://www.barcampkolin.cz/upload/2019/partner-logo/simpleshop-cz-6qeb7.png'],
        ],
        ['start' => '10:15','end' => '10:45',
            'sal1' => ['speaker' => 'Jiří Krejčík','talkName' => 'Nejčastější SEO problémy na webech a proč se jim věnovat','type' => 'tech','doporucuje' => 'https://www.barcampkolin.cz/upload/2019/partner-logo/vceliste-qu1fi.png'],
            'sal2' => ['speaker' => 'Karel Dytrych','talkName' => 'Z podpalubí podcastu Z podpalubí','type' => 'osobniRozvoj'],
            'sal3' => ['speaker' => 'Josef Řezníček','talkName' => 'Workshop: Jak na návrh, strukturu a obsah webu','type' => 'byznys'],
        ],
        ['start' => '11:00','end' => '11:25',
            'sal1' => ['speaker' => 'Petra Dolejšová','talkName' => 'AHA momenty mého podnikání','type' => 'byznys','doporucuje' => 'https://www.barcampkolin.cz/upload/2019/partner-logo/freelo-jvsuk.png'],
            'sal2' => ['speaker' => 'Radek Šimčík','talkName' => 'Jak na stres?!','type' => 'osobniRozvoj'],
            'sal3' => ['speaker' => 'Josef Řezníček','talkName' => 'Workshop: Jak na návrh, strukturu a obsah webu','type' => 'byznys'],
        ],
        ['start' => '11:45','end' => '12:10',
            'sal1' => ['speaker' => 'Mário Roženský','talkName' => 'Mastermind - aneb, když okolo sebe nemáš podnikatelské kamarády.','type' => 'byznys','doporucuje' => 'https://www.barcampkolin.cz/upload/2019/partner-logo/vceliste-qu1fi.png'],
            'sal2' => ['speaker' => 'Tomáš Polák','talkName' => 'Marketingová automatizace s lidskou tváří','type' => 'byznys'],
            'sal3' => ['speaker' => 'Radek Šimčík','talkName' => 'Workshop: Jak na stres?!','type' => 'osobniRozvoj'],
        ],
        ['start' => '12:30','end' => '12:55',
            'sal1' => ['speaker' => '','talkName' => 'Rozdávání cen z tomboly'],
        ],
        ['start' => '13:15','end' => '13:40',
            'sal1' => ['speaker' => 'Radek Viktor Haštaba','talkName' => 'Efektivní práce s podvědomím pro lepší život. / Jak fungujeme jako Člověk?','type' => 'osobniRozvoj','doporucuje' => 'https://www.barcampkolin.cz/upload/2019/partner-logo/workoholix-12557.png'],
            'sal2' => ['speaker' => 'Ladislav Vitouš','talkName' => 'Lidé vs. roboti aneb budoucnost lidské práce (nejen) v PPC','type' => 'tech'],
            'sal3' => ['speaker' => 'Václav Prak','talkName' => 'Jak si při obchodování udržet čistou hlavu a nedělat kraviny','type' => 'byznys'],
        ],
        ['start' => '14:00','end' => '14:25',
            'sal1' => ['speaker' => 'Janka Chudlíková','talkName' => '90 % problémů je jen v Tvojí hlavě…','type' => 'osobniRozvoj','doporucuje' => 'https://www.barcampkolin.cz/upload/2019/partner-logo/freelo-jvsuk.png'],
            'sal2' => ['speaker' => 'Marek Čevelíček','talkName' => 'Byznysové lekce, které mi daly lekci. 15 let a MASO rovnou do ruky','type' => 'byznys'],
            'sal3' => ['speaker' => 'Jakub Bouček','talkName' => 'Google Script - mocný a neznámý','type' => 'tech','doporucuje' => 'https://www.barcampkolin.cz/upload/2019/partner-logo/simpleshop-cz-6qeb7.png'],
        ],
        ['start' => '14:45','end' => '15:10',
            'sal1' => ['speaker' => 'Jan Řezáč','talkName' => 'Uživatelský výzkum','type' => 'byznys','doporucuje' => 'https://www.barcampkolin.cz/upload/2019/partner-logo/workoholix-12557.png'],
            'sal2' => ['speaker' => 'Alex Jura','talkName' => 'Jarní úklid našeho slovníku','type' => 'osobniRozvoj'],
            'sal3' => ['speaker' => 'Janka Chudlíková','talkName' => 'Workshop: 90 % problémů je jen v Tvojí hlavě…','type' => 'osobniRozvoj'],
        ],
        ['start' => '15:30','end' => '15:55',
            'sal1' => ['speaker' => 'Lída Charvátová','talkName' => 'Jak říci NE ústně i písemně','type' => 'osobniRozvoj'],
            'sal2' => ['speaker' => 'Pavel Tlapák','talkName' => 'Jak začít s optimalizací konverzního poměru webu?','type' => 'tech'],
            'sal3' => ['speaker' => 'Janka Chudlíková','talkName' => 'Workshop: 90 % problémů je jen v Tvojí hlavě…','type' => 'osobniRozvoj'],
        ],
        ['start' => '16:15','end' => '16:40',
            'sal1' => ['speaker' => 'Jakub Dostál','talkName' => 'Jednoduché tipy pro snižování tvorby vlastního odpadu','type' => 'osobniRozvoj'],
            'sal2' => ['speaker' => 'Michal Mrskoč','talkName' => 'Jak jsem se stal senior UX designerem','type' => 'tech'],
            'sal3' => ['speaker' => 'Dalibor Muráň','talkName' => 'Z 0 km na 100 km běhu za 2 roky aneb jak správně začít a pokračovat s běháním','type' => 'osobniRozvoj','doporucuje' => 'https://www.barcampkolin.cz/upload/2019/partner-logo/simpleticket-abu6y.png'],
        ],
        ['start' => '17:00','end' => '17:45',
            'sal1' => ['speaker' => 'Pavel Ungr','talkName' => 'Tyhle rumy nejsou pro starý!','type' => 'osobniRozvoj','doporucuje' => 'https://www.barcampkolin.cz/upload/2019/partner-logo/alkohol-cz-lb4yi.png'],
        ],
        ['start' => '18:00','end' => '18:20',
            'sal1' => ['speaker' => '','talkName' => 'Záverečné slovo'],
        ],
        ['start' => '18:30','end' => '19:00',
            'sal1' => ['speaker' => '','talkName' => 'Úklid'],
        ],
        ['start' => '19:00','end' => '22:00',
            'sal1' => ['speaker' => '','talkName' => 'AfterPárty: U Tří pírek'],
        ],
    ],
];

$saly = ['sal1','sal2','sal3'];
?>
<head>
    <meta charset="UTF-8">
    <meta name="description" content="Free Web tutorials">
    <meta name="keywords" content="HTML,CSS,XML,JavaScript">
    <meta name="author" content="John Doe">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="30">
    <style>
        div{font-family: 'Montserrat', sans-serif;}
        .speaker{font-size: 2.0em; font-weight: 900;}
        .talkName{font-size: 1.6em;}
        .big .speaker{font-size: 4.0em; font-weight: 900;}
        .big .talkName{font-size: 2.5em;}
        .byznys{color:#F00;background:#FFCCA6}
        .tech{color:#3f5bea;background:#EDEFFF}
        .osobniRozvoj{color:#009309;background:#DCFBDE}
        .none{background:#ddd}
        .time{font-size:2.5em;font-weight:bold;text-align:center;}
        table{table-layout: fixed;width:100%;}
        table .td1{width:120px;}
        table .saly td{font-size:2.5em;font-weight:bold;text-align:center;vertical-align:top;}
        table td{vertical-align:top;}
        table .saly td div{border-bottom:3px solid #000;padding-bottom:20px;}

    </style>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">
</head>
<div id="app">
    <?php
    $talkCurrent = null;
    foreach($arr['harmonogram'] as $k => $line){
        if(is_null($talkCurrent) && (($line['start'] <= $time && $line['end'] >= $time) || ($line['start'] > $time))){
            $talkCurrent = $line;
        }
        if(is_null($talkCurrent)){
            unset($arr['harmonogram'][$k]);
        }
    }
    if($_sal > 0){
        ?>
        <div style="text-align:center;font-size:4.0em;padding:40px;">V tomto sále následuje přednáška:</div>
        <table border="0" cellpadding="10" style="max-width:900px;margin:auto;margin-bottom:100px;border:1px solid #000;padding:20px;">
            <?php
            $line = $talkCurrent;
            if(!is_null($line)){
                ?>
                <tr class="big">
                    <td style="width:120px;">
                        <div class="time"><?=$line['start']?></div>
                    </td>
                    <?php
                    foreach(['sal'.$_sal] as $sal){
                        ?>
                        <td class="<?=isset($line[$sal]['type']) ? $line[$sal]['type'] : (isset($line[$sal]) ? 'none' : '')?>">
                            <div>
                                <div>
                                    <div class="speaker"><?=$line[$sal]['speaker']?></div>
                                    <div class="talkName"><?=$line[$sal]['talkName']?></div>
                                </div>
                            </div>
                        </td>
                        <?php
                    }
                    ?>
                </tr>
                <?php
                if($line[$sal]['doporucuje'] != ''){
                    ?>
                    <tr>
                        <td colspan="2" style="text-align:center;font-size:1.5em;padding:20px 0px 40px;">
                            <div>Tuto přednášku doporučuje:</div>
                            <div><img src="<?=$line[$sal]['doporucuje']?>" style="height:80px;margin:10px;"></div>
                        </td>
                    </tr>
                    <?php
                }
            }
        }
        ?>
    </table>
    <table border="0" width="100%" cellpadding="10">
        <tr class="saly">
            <td class="td1"></td>
            <?php
            foreach($saly as $sal){
                ?>
                <td><div><?=$arr['saly'][$sal]['name']?></div></td>
                <?php
            }
            ?>
        </tr>
        <?php
        foreach($arr['harmonogram'] as $line){
            if(!is_null($line)){
                ?>
                <tr>
                    <td>
                        <div class="time"><?=$line['start']?></div>
                    </td>
                    <?php
                    foreach($saly as $sal){
                        ?>
                        <td class="<?=isset($line[$sal]['type']) ? $line[$sal]['type'] : (isset($line[$sal]) ? 'none' : '')?>">
                            <div>
                                <div>
                                    <div class="speaker"><?=$line[$sal]['speaker']?></div>
                                    <div class="talkName"><?=$line[$sal]['talkName']?></div>
                                </div>
                            </div>
                        </td>
                        <?php
                    }
                    ?>
                </tr>
                <?php
            }
        }
        ?>
    </table>
</div>
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>

