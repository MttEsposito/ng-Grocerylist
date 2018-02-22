angular.module('nGgroceryList').controller('groceryCtrl', function($scope,$http,$kookies,$state,$timeout,grocerySrv) {
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
              $("#groceryListPrint").scrollTop($("#groceryListPrint")[0].scrollHeight);
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
    $('#completeBtn').click(function(){
        $('#totalSpent').val('');
    })
    $scope.saveData=function(){
        let totalCurrency=$('#totalSpent').val();
        if(totalCurrency!='')
        {
            let totalItem='',totalQty='';
            // for(let i=0;i<$scope.products.length;i++)
            // {
            //     totalItem+=$scope.products[i].item + ';'; 
            //     totalQty+=$scope.products[i].numberitem + ';'; 
            // }
            for(let index of $scope.products){
                totalItem+=index.item + ';';
                totalQty+=index.numberitem + ';'; 
            }
            console.log(totalItem)
            console.log(totalQty)
            let resItem=totalItem.substring(0, totalItem.length-1);
            let resQty=totalQty.substring(0, totalQty.length-1);
            $('#saveDataBtn').html("<i class='fa fa-lg fa-spinner fa-spin'></i>");
            $('#saveDataBtn').addClass('disBtn');
            $http({
            method : "POST",
            url : "../../server/store_data_user.php",
            cache:false,
            params: {
                listitem: resItem,
                qtyitem: resQty,
                price:totalCurrency
            },
            })
            .then(function(response){
                $('#completeShopping').modal('hide');
                $('#saveDataBtn').html("Save");
                $('#saveDataBtn').removeClass('disBtn');
                if(response.data.success=="success"){
                    $('#completeBtn').css('transform','scale(0)');
                    grocerySrv.showToastApp("Data Saved");
                    $scope.products = [];
                }else{
                    grocerySrv.showToastApp("Error try again later");
                }
            })
            .catch(function(err){
                grocerySrv.showToastApp("Error try again later");
            })
        }
        else
        {
            grocerySrv.blankInput("totalSpent");
        }
    }
    $scope.checkKeyInput=function(keyPress){
        if((keyPress.which >= 65 && keyPress.which <= 122) || keyPress.which == 8){ 
        }else{
            event.preventDefault(); 
        }
    }
})