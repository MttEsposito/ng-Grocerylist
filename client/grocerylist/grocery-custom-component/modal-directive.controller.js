angular.module('nGgroceryList').controller('modalCtrl',function($scope,$http,grocerySrv){
        $scope.saveData=function(){
        let totalCurrency=$('#totalSpent').val();
        if(totalCurrency!='')
        {
            let totalItem='',totalQty='';
            for(let index of $scope.products){
                totalItem+=index.item + ';';
                totalQty+=index.numberitem + ';'; 
            }
            let resItem=totalItem.substring(0, totalItem.length-1);
            let resQty=totalQty.substring(0, totalQty.length-1);
            $('#saveDataBtn').html("<i class='fa fa-lg fa-spinner fa-spin'></i>");
            $('#saveDataBtn').addClass('disBtn');
            let config={ method : "POST",url : "../../server/store_data_user.php",headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},cache:false,data: {listitem: resItem,qtyitem: resQty,price:totalCurrency} }
            $http(config)
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

})