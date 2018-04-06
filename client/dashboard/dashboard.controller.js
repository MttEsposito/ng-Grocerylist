angular.module('nGgroceryList').controller('dashCtrl', function($scope,$http,dashSrv,appCostants,ajaxSrv) {
		let isClick=false,dataY=[],dataX=[],recapPrint=[];
		$scope.getDataUser=function(){
		    $('#loader').removeClass('hide');
		    $('#dataPrinter').addClass('hide');
		    $('#errorLabel').addClass('hide');
		    let config={
		        method : "GET",
		        url : appCostants.dashboardServerUrl,
		        cache:false,
		        timeout: 10000,
		        params: {timeLine: $scope.dataTime.selectedOptions.data,userId:window.localStorage.getItem('userId')}
		    };
		    ajaxSrv.execAjax(config)
            .then(function(res){
                let item=[],qty=[];
                dataY=[],dataX=[],recapPrint=[];
                $('#loader').addClass('hide');
		        $('#dataPrinter').removeClass('hide');
		        if(res.data.nodata=="nodata")
		        {
		            $('#dataPrinter').addClass('hide');
		            $('#errorLabel').removeClass('hide');
		            $('#errorLabel').html(appCostants.dashboardError);
		        }
		        else
		        {
		            $('#errorLabel').addClass('hide');
                    for (let index of res.data)
                    {
                        dataX.push(index.data);
                        dataY.push(index.prezzo);
                        item.push(index.item);
                        qty.push(index.qty);
                        if(index.item.includes(";"))
                        {
                            recapPrint.push({
                                item:index.item.split(";"),
                                qty:index.qty.split(";"),
                                date:index.data
                            });
                        }
                        else
                        {
                            recapPrint.push({
                                item:index.item,
                                qty:index.qty,
                                date:index.data
                            });
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
               $('#errorLabel').html(appCostants.dashboardFail); 
            })
		}
	$scope.updateData=function(){
	    if(isClick){
	        $scope.getDataUser();
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