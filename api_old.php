<?php
    //session_start();
    //$ses_id = session_id();
    //$strCookie = 'PHPSESSID=' . $_COOKIE['PHPSESSID'] . '; path=/';
    //exit(0);
    function getCurl() {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'http://api.streethawk.com/users/profile/?format=json');
        curl_setopt($ch, CURLOPT_POST, FALSE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, "request=wrapper");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_COOKIEJAR, './cookie.txt');
        curl_setopt($ch, CURLOPT_COOKIEFILE, './cookie.txt');
        //curl_setopt($ch, CURLOPT_COOKIE, $strCookie);
        return $ch;
    }
    function closeCurl($ch) {
        curl_close($ch);
    }
    function arrayToURL($aValues) {
        return implode('&amp;', array_map(function($key, $val) {
            return 'aValues[' . urlencode($key) . ']=' . urlencode($val);
          },
          array_keys($aValues), $aValues)
        );
    }
    /*if ($_SESSION['favcolor']) {
    {

    }*/
    if($_GET['method'] == 'IsAuth') {
        $url = 'http://api.streethawk.com/users/profile/?format=json';
        $param = "";
        $curlObj = curl_init();
        curl_setopt($curlObj, CURLOPT_URL, $url);
        //curl_setopt($curlObj, CURLOPT_POST, TRUE);
        //curl_setopt($curlObj, CURLOPT_POSTFIELDS, $param);
        curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($curlObj, CURLOPT_COOKIEJAR, './cookie.txt');
        curl_setopt($curlObj, CURLOPT_COOKIEFILE, './cookie.txt');
        //curl_setopt($curlObj, CURLOPT_URL, $url);
        curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true);
        $result = curl_exec($curlObj);
        curl_close($curlObj);

    } elseif ($_GET['method'] == 'DoAuth') {
        $url = 'http://api.streethawk.com/users/login/?format=json';
        $param = "email=".$_GET['email']."&password=".$_GET['password']."&login_type=".$_GET['login_type'];

        $curlObj = curl_init();
        curl_setopt($curlObj, CURLOPT_URL, $url);
        curl_setopt($curlObj, CURLOPT_POST, TRUE);
        curl_setopt($curlObj, CURLOPT_POSTFIELDS, $param);
        curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($curlObj, CURLOPT_COOKIEJAR, './cookie.txt');
        curl_setopt($curlObj, CURLOPT_COOKIEFILE, './cookie.txt');
        //curl_setopt($curlObj, CURLOPT_URL, $url);
        //curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true) ;
        $result = curl_exec($curlObj);
        curl_close($curlObj);
    } elseif ($_GET['method'] == 'GetCampaigns') {
        $url = 'http://api.streethawk.com/retailers/XFVT8P/campaigns/?format=json';
        $curlObj = curl_init();
        curl_setopt($curlObj, CURLOPT_URL, $url);
        curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($curlObj, CURLOPT_COOKIEJAR, './cookie.txt');
        curl_setopt($curlObj, CURLOPT_COOKIEFILE, './cookie.txt');
        //curl_setopt($curlObj, CURLOPT_URL, $url);
        curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true);
        $result = curl_exec($curlObj);
        curl_close($curlObj);
        $json = json_decode($result);

        if ($json->{'code'} == 0) {
            $result = json_encode($json->{'value'}->{'results'});
        }
    } elseif ($_GET['method'] == 'GetCampaign') {
        $url = 'http://api.streethawk.com/campaigns/'.$_GET['campaignid'].'/?format=json';
        $curlObj = curl_init();
        curl_setopt($curlObj, CURLOPT_URL, $url);
        curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($curlObj, CURLOPT_COOKIEJAR, './cookie.txt');
        curl_setopt($curlObj, CURLOPT_COOKIEFILE, './cookie.txt');
        //curl_setopt($curlObj, CURLOPT_URL, $url);
        curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true);
        $result = curl_exec($curlObj);
        curl_close($curlObj);
        $json = json_decode($result);

        if ($json->{'code'} == 0) {
            $result = json_encode($json->{'value'}->{'campaign'});
        }
    } elseif ($_GET['method'] == 'GetCampaign') {
         $url = 'http://api.streethawk.com/campaigns/'.$_GET['campaignid'].'/?format=json';
         $curlObj = curl_init();
         curl_setopt($curlObj, CURLOPT_URL, $url);
         curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
         curl_setopt($curlObj, CURLOPT_COOKIEJAR, './cookie.txt');
         curl_setopt($curlObj, CURLOPT_COOKIEFILE, './cookie.txt');
         //curl_setopt($curlObj, CURLOPT_URL, $url);
         curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true);
         $result = curl_exec($curlObj);
         curl_close($curlObj);
         $json = json_decode($result);

         if ($json->{'code'} == 0) {
             $result = json_encode($json->{'value'}->{'campaign'});
         }
    } elseif ($_GET['method'] == 'GetShops') {
        $url = 'http://api.streethawk.com/retailers/XFVT8P/shops/?format=json';
        $curlObj = curl_init();
        curl_setopt($curlObj, CURLOPT_URL, $url);
        curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($curlObj, CURLOPT_COOKIEJAR, './cookie.txt');
        curl_setopt($curlObj, CURLOPT_COOKIEFILE, './cookie.txt');
        //curl_setopt($curlObj, CURLOPT_URL, $url);
        curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true);
        $result = curl_exec($curlObj);
        curl_close($curlObj);
        $json = json_decode($result);

        if ($json->{'code'} == 0) {
            $result = json_encode($json->{'value'}->{'results'});
        }
    } elseif ($_GET['method'] == 'GetOffer') {
        $url = 'http://api.streethawk.com/offers/'.$_GET['offerid'].'/?format=json';
        $curlObj = curl_init();
        curl_setopt($curlObj, CURLOPT_URL, $url);
        curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($curlObj, CURLOPT_COOKIEJAR, './cookie.txt');
        curl_setopt($curlObj, CURLOPT_COOKIEFILE, './cookie.txt');
        //curl_setopt($curlObj, CURLOPT_URL, $url);
        curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true);
        $result = curl_exec($curlObj);
        curl_close($curlObj);
        $json = json_decode($result);

        if ($json->{'code'} == 0) {
            $result = json_encode($json->{'value'}->{'offer'});
        }
    } elseif ($_GET['method'] == 'DoLogout') {
        $url = 'http://api.streethawk.com/accounts/logout/?format=json';
        $curlObj = curl_init();
        curl_setopt($curlObj, CURLOPT_URL, $url);
        curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($curlObj, CURLOPT_COOKIEJAR, './cookie.txt');
        curl_setopt($curlObj, CURLOPT_COOKIEFILE, './cookie.txt');
        //curl_setopt($curlObj, CURLOPT_URL, $url);
        curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true);
        $result = curl_exec($curlObj);
        curl_close($curlObj);
        $json = json_decode($result);
        {}
    }else {
         echo "{}";
         exit(0);
     }
    //$curlObj = getCurl();

    echo $result;
?>