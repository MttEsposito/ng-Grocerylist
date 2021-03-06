<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	require_once "connect-to-db-app.php";
	$idUser = $_GET["userid"];
	$userName = $_GET["username"];
	$timeLine = $_GET["timeLine"];
	if($timeLine == "")
	{
		$timeLine = "Week";
	}
	$resultData = new \stdClass();
		switch($timeLine)
		{
			case "All" :
				{
					$getUserData = "SELECT prezzo,listitem,qtyitem,date FROM datauser_$idUser"."_"."$userName ORDER BY DATE ASC ";
					break;
				}
			case "Month" :
				{
					$getUserData = "SELECT prezzo,listitem,qtyitem,date FROM datauser_$idUser"."_"."$userName WHERE MONTH( DATE ) = MONTH(CURRENT_TIMESTAMP) AND YEAR( DATE ) = YEAR(CURRENT_TIMESTAMP) ORDER BY DATE ASC ";
					break;
				}
			case "Week" :
				{
					$count = date("w");
					if($count == 0)
					{
						$count = 7;	
					}
					$getUserData = "SELECT prezzo,listitem,qtyitem,date FROM datauser_$idUser"."_"."$userName WHERE date < CURRENT_TIMESTAMP and date > ADDDATE(CURRENT_TIMESTAMP,INTERVAL - $count DAY) ORDER BY DATE ASC ";
					break;
				}
		}
	try
	{
		$query = mysqli_query($con,$getUserData);
			if($query -> num_rows > 0)
				{
				while($row = mysqli_fetch_array($query))
					{
						$dataArr = array();
						$dataArr["prezzo"] = $row["prezzo"];
						$dataArr["item"] = $row["listitem"];
						$dataArr["qty"] = $row["qtyitem"];
						$dataArr["data"] = $row["date"];
						$resultDataUser[] = $dataArr;
        			}
						mysqli_close($con);
						$myJson = json_encode($resultDataUser);
						echo $myJson;
				}
			else
				{
					$resultData -> nodata = "nodata";
					$myJson = json_encode($resultData);
					echo $myJson;
				}
	}
	catch(Exception $e)
	{
	    $resultData -> error = "error";
	    $myJson = json_encode($resultData);
		echo $myJson;
		mysqli_close($con);
	}
?>