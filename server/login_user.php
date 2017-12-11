<?php
$UserEmail = $_GET['email']; 
$UserPassword = $_GET['password'];
include_once 'connect-to-db-app.php';
$result = mysqli_query($con, "SELECT * FROM User_app WHERE email = '" .$UserEmail. "' and password = '" .$UserPassword. "'");
if ($row = mysqli_fetch_array($result)) {
        session_start();
		$_SESSION['app_user_id'] = $row['userid'];
		$_SESSION['app_user_name'] = $row['name'];
		echo $_SESSION['app_user_name'];
	} else {
		echo"error";
	}
mysqli_close($con);
?>