angular.module('nGgroceryList').controller('dashCtrl', function($scope,$http,$kookies,dashSrv) {
   	angular.element(document).ready(function () {
			getDataUser();
		});
		var isClick=false,myChart,dataY=[],dataX=[],recapPrint=[];
		function getDataUser(){
		    $('#loader').removeClass('hide');
		    $('#dataPrinter').addClass('hide');
		    $('#errorLabel').addClass('hide');
		    $http({
            method : "GET",
            url : "../../server/get_data_user.php",
            cache:false,
            params: {
                timeLine: $scope.dataTime.selectedOptions.data,
            },
            })
            .then(function(res){
                var item=[],qty=[];
                dataY=[],dataX=[],recapPrint=[];
                $('#loader').addClass('hide');
		        $('#dataPrinter').removeClass('hide');
		        if(res.data.nodata=="nodata")
		        {
		            $('#dataPrinter').addClass('hide');
		            $('#errorLabel').removeClass('hide');
		            $('#errorLabel').html("No data saved yet!");
		        }
		        else
		        {
		            $('#errorLabel').addClass('hide');
		           for(var i=0;i<res.data.length;i++)
                    {
                       dataX.push(res.data[i].data);
                       dataY.push(res.data[i].prezzo);
                       item.push(res.data[i].item);
                       qty.push(res.data[i].qty);
                       if(res.data[i].item.includes(";")){
                       recapPrint.push({item:res.data[i].item.split(";"),qty:res.data[i].qty.split(";"),date:res.data[i].data})
                       }else{
                       recapPrint.push({item:res.data[i].item,qty:res.data[i].qty,date:res.data[i].data})
                       }
                    }
                $scope.maxSpent = dashSrv.maX(dataY);
                $scope.minSpent = dashSrv.miN(dataY);
                $scope.averageSpent = dashSrv.avG(dataY);
                if(myChart != undefined){
                	myChart.destroy();
                }
                chartCreate();
                var resData="";
                for(var i=0;i<recapPrint.length;i++)
                {
                	if(Array.isArray(recapPrint[i].item)){
                		resData+="<recaplist><div class='groDate'>Grocery list date : "+recapPrint[i].date+"</div>";
                		for(var j=0;j<recapPrint[i].item.length;j++){
                		   resData+="<div><item>Item "+recapPrint[i].item[j]+"</item> <qty>Number  "+recapPrint[i].qty[j]+"</qty></div>";
                		}
                		resData=resData+"</recaplist>"
                	}else{
                	resData+="<div class='recaplist'><div class='groDate'>Grocery list date : "+recapPrint[i].date+"</div><item>Item "+recapPrint[i].item+"</item> <qty>Number "+recapPrint[i].qty+"</qty></div>";
                	}
                }
                $('#recapListPrint').html(resData);
		        }
            })
            .catch(function(err){
               $('#loader').addClass('hide');
               $('#errorLabel').removeClass('hide');
               $('#dataPrinter').addClass('hide');
               $('#errorLabel').html("Ups! an error occured <i class='fa fa-frown-o'></i> <br> Try again later"); 
            })
		}
	$scope.updateData=function(){
	    if(isClick){
	        getDataUser();
	    }
	}
	$scope.checkClick=function(){
		isClick=true;
	}
    $scope.dataTime = {
 	 availableOptions: [
 		 {id: "Week", data :"week" },
 		 {id: "Month", data : "month"},
 		 {id: "All", data : "all"},
 	 ],
 	 selectedOptions:[{
		 id: "All", data : "all",
 	 }]
 	 };
 	 function chartCreate(){
 		var canvas = document.getElementById('chartPrint');
    	 var dataChart = 
    	 {
    	 	labels: dataX,
    	 	datasets: 
    	 	[
		    	{
		          label: "Shopping History",
		          fill: true,
		          lineTension: 0,
		          backgroundColor: "rgba(26, 188, 156,0.3)",
		          borderColor: "#1ABC9C",
		          pointBorderColor: "#1ABC9C",
		          pointBorderWidth: 1,
    			  pointHoverRadius: 5,
		          pointBackgroundColor: "#fff",
		          pointHoverBackgroundColor: "rgba(75,192,192,1)",
				  pointHoverBorderColor: "rgba(220,220,220,1)",
				  pointHoverBorderWidth: 2,
				  pointRadius: 6,
				  pointHitRadius: 7,
		          data: dataY,
		        }
		    ]
	    };
	    if(dataX.length>4)
	    {
	    	$("xaxes").removeClass('hide')
	    	var option=
	        {
	    		scales:
            	{
					xAxes: 
					[{
		            	display: false
		            }]
                },
	    	}
	    }
	    else
	    {
	     $("xaxes").addClass('hide')
	    }
		myChart = new Chart(canvas, {
			type: 'line',
		    data: dataChart,
		    options:option,
		})
 	 }
 	
})