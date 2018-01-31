angular.module('nGgroceryList').controller('dashCtrl', function($scope,$http,$kookies) {
   	angular.element(document).ready(function () {
			getDataUser();
		});
		var isClick=false,myChart,dataY=[],dataX=[];
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
                var item=[],qty=[],tot=[],maxSpent,minSpent,averageSpent;
                dataY=[],dataX=[];
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
                       tot.push({item:item[i].split(";")});
                    }
                maxSpent=Math.max.apply(null,dataY.map(Number));
                minSpent=Math.min.apply(null,dataY.map(Number));
                averageSpent = dataY.map(Number).reduce((a, b) => a + b, 0)/dataY.map(Number).length;
                if(myChart!=undefined){
                	myChart.destroy();
                }
                chartCreate();		
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
		          label: "My Shopping History",
		          fill: true,
		          lineTension: 0,
		          backgroundColor: ['#1abc9c4f'],
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
	     var option={};
	    }
		myChart = new Chart(canvas, {
			type: 'line',
		    data: dataChart,
		    options:option,
		})
 	 }
 	
})