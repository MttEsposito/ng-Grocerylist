<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	require_once 'connect-to-db-app.php';
	$postData = file_get_contents('php://input');
	$jsonDataPost = json_decode($postData);
	$UserEmail = $jsonDataPost -> email; 
	$UserPassword = $jsonDataPost -> password; 
	try{
		$queryLogin = "SELECT email,psw,username,id FROM user_app WHERE email = '$UserEmail' and psw = '".md5($UserPassword)."' and is_active=1";
		$result = mysqli_query($con, $queryLogin);
		if ($row = mysqli_fetch_array($result)) {
			$myObjUser = new \stdClass();
			$myObjUser -> userid = $row['id'];
			$myObjUser -> username = $row['username'];
			$myJson = json_encode($myObjUser);
			echo $myJson;
			mysqli_close($con);
		} else {
			$myObjUser = new \stdClass();
			$myObjUser -> userid = 'error';
			$myJson = json_encode($myObjUser);
			echo $myJson;
		}	
	}
	catch(Exception $e){
		mysqli_close($con);
	}
?>