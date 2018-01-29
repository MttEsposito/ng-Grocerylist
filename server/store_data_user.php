<?php
	session_start();
	include_once 'connect-to-db-app.php';
	$idUser = $_SESSION['app_user_id'];
	$listItem = $_GET['listitem']; 
	$qtyItem = $_GET['qtyitem'];
	$priceTot = $_GET['price'];
	$myDate = date('Y-m-d ');
	$resultData = new \stdClass();
	$tableCreate = "CREATE TABLE IF NOT EXISTS user_".$idUser."_data (ID int(255) NOT NULL auto_increment,prezzo double(10,2) NOT NULL,listitem varchar(255) NOT NULL ,qtyitem varchar(255) NOT NULL,date DATE NOT NULL,PRIMARY KEY  (ID))";
	try
	{
	    mysqli_query($con,$tableCreate);
	}
	catch(Exception $e)
	{
	    $resultData->error = "error";
	    $myJson = json_encode($resultData);
		echo $myJson;
		mysqli_close($con);
	}
	try
	{
	    $storeData="INSERT INTO user_".$idUser."_data (prezzo,listitem,qtyitem,date) VALUES ('" . $priceTot . "','" . $listItem . "','" . $qtyItem . "','" . $myDate . "')";
	    mysqli_query($con,$storeData);
	    $resultData->success = "success";
	    $myJson = json_encode($resultData);
	    echo $myJson;
	    mysqli_close($con);
	}
	catch(Exception $e)
	{
	    $resultData->error = "error";
	    $myJson = json_encode($resultData);
		echo $myJson;
	    mysqli_close($con);
	}
?>