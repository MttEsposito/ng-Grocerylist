<?php
    // function for send an email when the query fail
	
	$to = '';
    $subject = "Query fail on $pageFail";
    $htmlContent = "
        <h1>Fail query</h1><br>
        <p><b>UserID: </b>".$idUser."</p><br>
    ";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: <mattiaespo.theorema@gmail.com>' . "\r\n";
    @mail($to,$subject,$htmlContent,$headers);

?>