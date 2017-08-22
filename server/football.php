<?php



require_once('unirest-php/src/Unirest.php');
$response = Unirest\Request::get("https://www.fantasyfootballnerd.com/service/{$_GET['service-name']}/{$_GET['format']}/{$_GET['api-key']}");
print($response -> raw_body);

?>