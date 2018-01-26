<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
    session_start();
	session_destroy();
	unset($_SESSION['app_user_id']);
	unset($_SESSION['app_user_name']);
?>