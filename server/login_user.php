<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	$postData = file_get_contents('php://input');
	$jsonDataPost = json_decode($postData);
	$UserEmail = $jsonDataPost -> email; 
	$UserPassword = $jsonDataPost -> password; 
	include_once 'connect-to-db-app.php';
	try{
		$result = mysqli_query($con, "SELECT email,password,name,userid FROM User_app WHERE email = '" .$UserEmail. "' and password = '" .$UserPassword. "'");
		if ($row = mysqli_fetch_array($result)) {
			$myObjUser = new \stdClass();
			$myObjUser->userid = $row['userid'];
			$myObjUser->name = $row['name'];
			$myJson = json_encode($myObjUser);
			echo $myJson;
			mysqli_close($con);
		} else {
			$myObjUser = new \stdClass();
			$myObjUser->userid = 'error';
			$myJson = json_encode($myObjUser);
			echo $myJson;
		}	
	}
	catch(Exception $e){
		mysqli_close($con);
	}
?>