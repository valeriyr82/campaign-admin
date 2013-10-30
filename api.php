<?php
/**
 * Step 1: Require the Slim Framework
 *
 * If you are not using Composer, you need to require the
 * Slim Framework and register its PSR-0 autoloader.
 *
 * If you are using Composer, you can skip this step.
 */
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new \Slim\Slim();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, and `Slim::delete`
 * is an anonymous function.
 */
$cookie_file = '/home/bitnami/cookie.txt';

 // GET campaigns list
$app->get('/api/campaigns', function () use ($app, $cookie_file) {
    $fields_string = '';
    $params = (array) $app->request()->params();
    foreach($params as $key=>$value) {
        $fields_string .= '&'.$key.'='.$value;
    }
    $url = 'http://api.streethawk.com/retailers/XFVT8P/campaigns/?format=json'.$fields_string;

    $curlObj = curl_init();
    curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($curlObj, CURLOPT_COOKIEJAR, $cookie_file);
    curl_setopt($curlObj, CURLOPT_COOKIEFILE, $cookie_file);
    //curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true);
    $result = curl_exec($curlObj);
    curl_close($curlObj);
    $json = json_decode($result);

    if ($json->{'code'} == 0) {
        $result = json_encode($json->{'value'}->{'results'});
    }
    echo $result;
});
// $app->get('/api/auth/:email/:pwd/:type', function ($email, $pwd, $type) use ($app, $cookie_file) {

 // GET campaign by ID
$app->get('/api/campaigns/:_id', function ($_id) use ($app, $cookie_file) {
    $url = 'http://api.streethawk.com/campaigns/'.$_id.'/?format=json';
    $curlObj = curl_init();
    curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($curlObj, CURLOPT_COOKIEJAR, $cookie_file);
    curl_setopt($curlObj, CURLOPT_COOKIEFILE, $cookie_file);
    //curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true);
    $result = curl_exec($curlObj);
    curl_close($curlObj);
    $json = json_decode($result);

    if ($json->{'code'} == 0) {
        $result = json_encode($json->{'value'}->{'campaign'});
    }
    echo $result;
});


// Modify campaign by ID
$app->put('/api/campaigns/:_id', function ($_id) use ($app, $cookie_file) {
    $fields_string = '';
    $request = (array) json_decode($app->request()->getBody());
	$url = 'http://api.streethawk.com/campaigns/'.$_id.'/update/?format=json';
	foreach($request as $key=>$value) {
		if(gettype($value) != "object") {
            $fields_string .= $key.'='.((string)$value).'&';
        } else {
			foreach($value as $subkey=>$subvalue) {
				$fields_string .= $subkey.'='.$subvalue.'&';
			}
		}

	}

    $curlObj = curl_init();
    curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($curlObj, CURLOPT_COOKIEJAR, $cookie_file);
    curl_setopt($curlObj, CURLOPT_COOKIEFILE, $cookie_file);
    //curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true);
    curl_setopt($curlObj, CURLOPT_POST, true);
    curl_setopt($curlObj, CURLOPT_POSTFIELDS, $fields_string);
    $result = curl_exec($curlObj);
    curl_close($curlObj);
    $json = json_decode($result);
    if ($json->{'code'} == 0) {
        $result = json_encode($json->{'value'});
    }
    echo $result;
});

// Create Campaign
$app->post('/api/campaigns/', function () use ($app, $cookie_file) {
    $fields_string = '';
    $request = (array) json_decode($app->request()->getBody());
	$url = 'http://api.streethawk.com/retailers/XFVT8P/campaigns/create/?format=json';
	foreach($request as $key=>$value) {
		if(gettype($value) != "object") {
            $fields_string .= $key.'='.((string)$value).'&';
        }
	}

    $curlObj = curl_init();
    curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($curlObj, CURLOPT_COOKIEJAR, $cookie_file);
    curl_setopt($curlObj, CURLOPT_COOKIEFILE, $cookie_file);
    //curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true);
    curl_setopt($curlObj, CURLOPT_POST, true);
    curl_setopt($curlObj, CURLOPT_POSTFIELDS, $fields_string);
    $result = curl_exec($curlObj);
    curl_close($curlObj);
    $json = json_decode($result);
    if ($json->{'code'} == 0) {
        $result = json_encode($json->{'value'});
    }
    echo $result;
});

// DELETE route
$app->delete('/api/campaigns/:_id', function () use ($app, $cookie_file) {

	$request = (array) json_decode($app->request()->getBody());

	//use $request['id'] to remove database entry based on id...

	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($request);
});

// DELETE route
$app->post('/api/deletecampaigns', function () use ($app, $cookie_file) {

	$fields_string = '';
    $request = (array) json_decode($app->request()->getBody());

    $url = 'http://api.streethawk.com/retailers/XFVT8P/campaigns/delete/?format=json';

    //$fields_string = $request;
    //var_dump($request);
    //var_dump($request['suids']);

    $fields_string = 'suids='.$request['suids'].'&cuids='.$request['cuids'];

    $curlObj = curl_init();
    curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($curlObj, CURLOPT_COOKIEJAR, $cookie_file);
    curl_setopt($curlObj, CURLOPT_COOKIEFILE, $cookie_file);
    curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true);
    curl_setopt($curlObj, CURLOPT_POST, true);
    curl_setopt($curlObj, CURLOPT_POSTFIELDS, $fields_string);
    $result = curl_exec($curlObj);
    curl_close($curlObj);
    $json = json_decode($result);
    if ($json->{'code'} == 0) {
        $result = json_encode($json->{'value'});
    }
    echo $result;
});

// GET route
$app->get('/api/shops', function () use ($app, $cookie_file) {
    $url = 'http://api.streethawk.com/retailers/XFVT8P/shops/?format=json';
    $curlObj = curl_init();
    curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($curlObj, CURLOPT_COOKIEJAR, $cookie_file);
    curl_setopt($curlObj, CURLOPT_COOKIEFILE, $cookie_file);
    //curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true);
    $result = curl_exec($curlObj);
    curl_close($curlObj);
    $json = json_decode($result);

    if ($json->{'code'} == 0) {
        $result = json_encode($json->{'value'}->{'results'});
    }
    echo $result;
});

// GET route
$app->get('/api/users', function () use ($app, $cookie_file) {
	$url = 'http://api.streethawk.com/retailers/XFVT8P/userlists/?format=json';
    $curlObj = curl_init();
    curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($curlObj, CURLOPT_COOKIEJAR, $cookie_file);
    curl_setopt($curlObj, CURLOPT_COOKIEFILE, $cookie_file);
    //curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true);
    $result = curl_exec($curlObj);
    curl_close($curlObj);
    $json = json_decode($result);

    if ($json->{'code'} == 0) {
        $result = json_encode($json->{'value'}->{'results'});
    }
    echo $result;
});

// POST route
$app->get('/api/offers/:_id', function ($_id) use ($app, $cookie_file) {
    $url = 'http://api.streethawk.com/offers/'.$_id.'/?format=json';
    $curlObj = curl_init();
    curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($curlObj, CURLOPT_COOKIEJAR, $cookie_file);
    curl_setopt($curlObj, CURLOPT_COOKIEFILE, $cookie_file);
    //curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true);
    $result = curl_exec($curlObj);
    curl_close($curlObj);
    $json = json_decode($result);

    if ($json->{'code'} == 0) {
        $result = json_encode($json->{'value'}->{'offer'});
    }
    echo $result;
});

// PUT route
$app->put('/api/offers/:_id', function ($_id) use ($app, $cookie_file) {
    $fields_string = '';
    $request = (array) json_decode($app->request()->getBody());
    $url = 'http://api.streethawk.com/offers/'.$_id.'/update/?format=json';
    foreach($request as $key=>$value) {
        if(gettype($value) != "object" && gettype($value) != "array") {
            $fields_string .= $key.'='.((string)$value).'&';
        }
    }

    $curlObj = curl_init();
    curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($curlObj, CURLOPT_COOKIEJAR, $cookie_file);
    curl_setopt($curlObj, CURLOPT_COOKIEFILE, $cookie_file);
    //curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true);
    curl_setopt($curlObj, CURLOPT_POST, true);
    curl_setopt($curlObj, CURLOPT_POSTFIELDS, $fields_string);
    $result = curl_exec($curlObj);
    curl_close($curlObj);
    $json = json_decode($result);
    if ($json->{'code'} == 0) {
        $result = json_encode($json->{'value'});
    }
    echo $result;
});

// POST route
$app->get('/api/isauth', function () use ($app, $cookie_file) {

	/*$request = (array) json_decode($app->request()->getBody());

	// Save to database here creating a new entry with $request['name']; $request['favoriteColor'];

	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($request);*/

	$url = 'http://api.streethawk.com/users/profile/?format=json';
    $param = "";
    $curlObj = curl_init();
    curl_setopt($curlObj, CURLOPT_URL, $url);
    //curl_setopt($curlObj, CURLOPT_POST, TRUE);
    //curl_setopt($curlObj, CURLOPT_POSTFIELDS, $param);
    curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($curlObj, CURLOPT_COOKIEJAR, $cookie_file);
    curl_setopt($curlObj, CURLOPT_COOKIEFILE, $cookie_file);
    //curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true);
    $result = curl_exec($curlObj);
    curl_close($curlObj);
    echo $result;
});

$app->get('/api/auth/:email/:pwd/:type', function ($email, $pwd, $type) use ($app, $cookie_file) {

	$url = 'http://api.streethawk.com/users/login/?format=json';
    $param = "email=$email&password=$pwd&login_type=$type";

    /*if(! is_writeable($cookie_file)) {
        echo 'Cookie file missing or not writeable... '.$cookie_file;
        exit;
    }*/

    $curlObj = curl_init();
    curl_setopt($curlObj, CURLOPT_URL, $url);
    curl_setopt($curlObj, CURLOPT_POST, TRUE);
    curl_setopt($curlObj, CURLOPT_POSTFIELDS, $param);
    curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($curlObj, CURLOPT_COOKIEJAR, $cookie_file);
    curl_setopt($curlObj, CURLOPT_COOKIEFILE, $cookie_file);
    //curl_setopt($curlObj, CURLOPT_URL, $url);
    //curl_setopt($curlObj, CURLOPT_BINARYTRANSFER, true) ;
    $result = curl_exec($curlObj);
    curl_close($curlObj);
    //$app->response()->header('Content-Type', 'application/json');
    echo $result;//json_encode($request);
});

/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
