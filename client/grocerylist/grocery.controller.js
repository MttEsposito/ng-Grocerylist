angular.module('nGgroceryList').controller('groceryCtrl', function($scope,$timeout,grocerySrv) {
    $scope.products = [];
    $scope.addItem = function () {
        if($("#item").val()==""){
            grocerySrv.blankInput("item");
        }else{
            $scope.products = grocerySrv.createArrItem($scope.products,$scope.item.toLowerCase());
            }
            $scope.item="";
            grocerySrv.checkCompleteFabButton($scope.products);
            $('#item').focus();
            $timeout(function() {
                $("#groceryListPrint").animate({ scrollTop: ($("#groceryListPrint")[0].scrollHeight) }, 700);
            }, 0, false);
    }
    $scope.removeItem = function (index) {
        $scope.products.splice(index, 1);
        grocerySrv.checkCompleteFabButton($scope.products);
    }
    $scope.addNum=function(index){
        $scope.products[index].numberitem=$scope.products[index].numberitem+1;
    }
    $scope.removeNum=function(index){
        if($scope.products[index].numberitem!=1){
        $scope.products[index].numberitem=$scope.products[index].numberitem-1;
        }
    }
    $scope.checkItem = function (index,event) {
            grocerySrv.chckIt(index,event,$scope.products);
            grocerySrv.checkCompleteFabButton($scope.products);
    }
    // reset value input on click complete button
    $('#completeBtn').click(function(){
        $('#totalSpent').val('');
    });
})