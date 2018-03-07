angular.module('nGgroceryList').controller('dashCtrl', function($scope,$http,dashSrv) {
   	angular.element(document).ready(function () {
			getDataUser();
		});
		let isClick=false,dataY=[],dataX=[],recapPrint=[];
		function getDataUser(){
		    $('#loader').removeClass('hide');
		    $('#dataPrinter').addClass('hide');
		    $('#errorLabel').addClass('hide');
		    let config={method : "GET",url : "../../server/get_data_user.php",cache:false,params: {timeLine: $scope.dataTime.selectedOptions.data,userId:window.localStorage.getItem('userId')}};
		    $http(config)
            .then(function(res){
                let item=[],qty=[];
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
		           for(let i=0;i<res.data.length;i++)
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
                // bind the max spent value
                $scope.maxSpent = dashSrv.maX(dataY);
                // bind the min spent value
                $scope.minSpent = dashSrv.miN(dataY);
                //bind the avg spent value
                $scope.averageSpent = dashSrv.avG(dataY);
                // create the data chart 
                dashSrv.chartCreate(dataX,dataY);
                // bind the crated recap list
                $scope.recapList = dashSrv.recapList(recapPrint);
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
})