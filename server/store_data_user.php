<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	require_once "connect-to-db-app.php";
	$postData = file_get_contents("php://input");
	$jsonDataPost = json_decode($postData);
	$idUser = $jsonDataPost -> userid;
	$userName = $jsonDataPost -> username;
	$listItem = $jsonDataPost -> listitem; 
	$qtyItem = $jsonDataPost -> qtyitem; 
	$priceTot = $jsonDataPost -> price;
	$myDate = date("Y-m-d ");
	$resultData = new \stdClass();
	$tableCreate = "CREATE TABLE IF NOT EXISTS datauser_$idUser"."_"."$userName (ID int(255) NOT NULL auto_increment,prezzo double(10,2) NOT NULL,listitem varchar(255) NOT NULL ,qtyitem varchar(255) NOT NULL,date DATE NOT NULL,PRIMARY KEY  (ID))";
	try
	{
	    mysqli_query($con,$tableCreate);
	}
	catch(Exception $e)
	{
	    $resultData -> error = "error";
	    $myJson = json_encode($resultData);
		echo $myJson;
		mysqli_close($con);
	}
	try
	{
	    $storeData = "INSERT INTO datauser_$idUser"."_"."$userName (prezzo,listitem,qtyitem,date) VALUES ('$priceTot','$listItem','$qtyItem','$myDate')";
	    mysqli_query($con,$storeData);
	    $resultData -> success = "success";
	    $myJson = json_encode($resultData);
	    echo $myJson;
	    mysqli_close($con);
	}
	catch(Exception $e)
	{
	    $resultData -> error = "error";
	    $myJson = json_encode($resultData);
		echo $myJson;
	    mysqli_close($con);
	}
?>