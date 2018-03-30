angular.module('nGgroceryList').controller('modalCtrl',function($scope,grocerySrv,appCostants,modalGrocerySrv,ajaxSrv){
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
                modalGrocerySrv.btnStoreDataEvent(0)
                let config={ 
                    method : "POST",
                    url : appCostants.groceryServerUrl,
                    headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
                    cache:false,
                    data: {listitem: resItem,qtyitem: resQty,price:totalCurrency,userId:window.localStorage.getItem('userId')}
                };
                ajaxSrv.execAjax(config)
                .then(function(response){
                    $('#completeShopping').modal('hide');
                    modalGrocerySrv.btnStoreDataEvent(1)
                    if(response.data.success=="success"){
                        $('#completeBtn').css('transform','scale(0)');
                        modalGrocerySrv.showToastApp(appCostants.toastSaveSuccess);
                        $scope.products = [];
                    }else{
                        modalGrocerySrv.showToastApp(appCostants.toastSaveError);
                    }
                })
                .catch(function(err){
                    modalGrocerySrv.btnStoreDataEvent(1)
                    modalGrocerySrv.showToastApp(appCostants.toastSaveError);
                })
            }
            else
            {
                grocerySrv.blankInput("totalSpent");
            }
        }
})