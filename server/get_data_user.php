<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	session_start();
	include_once 'connect-to-db-app.php';
	$idUser = $_SESSION['app_user_id'];
	$timeLine = $_GET['timeLine'];
	$resultData = new \stdClass();
		switch($timeLine)
		{
			case "all":
				{
					$getUserData = "SELECT prezzo,listitem,qtyitem,date FROM user_".$idUser."_data";
					break;
				}
			case "month":
				{
					$getUserData = "SELECT prezzo,listitem,qtyitem,date FROM user_".$idUser."_data WHERE MONTH( DATE ) = MONTH(CURRENT_TIMESTAMP) AND YEAR( DATE ) = YEAR(CURRENT_TIMESTAMP)";
					break;
				}
			case "week":
				{
					$count=date('w');
					if($count==0)
					{
						$count=7;	
					}
					$getUserData = "SELECT prezzo,listitem,qtyitem,date FROM user_".$idUser."_data WHERE date < CURRENT_TIMESTAMP and date > ADDDATE(CURRENT_TIMESTAMP,INTERVAL -".$count." DAY)";
					break;
				}
		}
	try
	{
		mysqli_query($con,$getUserData);
			if($query = mysqli_query($con,$getUserData))
				{
				while($row = mysqli_fetch_array($query))
					{
						$dataArr = array();
						$dataArr['prezzo'] = $row['prezzo'];
						$dataArr['item'] = $row['listitem'];
						$dataArr['qty'] = $row['qtyitem'];
						$dataArr['data'] = $row['date'];
						$props[] = $dataArr;
        			}
						mysqli_close($con);
						$myJson = json_encode($props);
						echo $myJson;
				}
				else
				{
					$resultData->nodata = "nodata";
					$myJson = json_encode($resultData);
					echo $myJson;
				}
	}
	catch(Exception $e)
	{
	    $resultData->error = "error";
	    $myJson = json_encode($resultData);
		echo $myJson;
		mysqli_close($con);
	}
?>