<?php
    session_start();
	session_destroy();
	unset($_SESSION['app_user_id']);
	unset($_SESSION['app_user_name']);
?>