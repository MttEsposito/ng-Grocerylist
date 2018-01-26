angular.module('nGgroceryList').controller('groceryCtrl', function($scope,$http,$kookies,$state) {
    $scope.products = [];
    var addItemCheck;
     $scope.addItem = function () {
        if($("#item").val()==""){
          $("#item").addClass("errorblankInpt");
            setTimeout(function () {
            $('#item').removeClass('errorblankInpt');
        }, 1000);
        }else{
            if($scope.products.length > 0)
            {
                for(var i=0;i<$scope.products.length;i++)
                {
                    if($scope.products[i].item==$scope.item)
                    {
                        $scope.products[i].numberitem=$scope.products[i].numberitem+1;
                        addItemCheck=true;
                    }
                }
                if(!addItemCheck){
                    $scope.products.push({item:$scope.item,numberitem: 1,check: false});
                }
                addItemCheck=false;
            }
            else{
                $scope.products.push({item:$scope.item,numberitem: 1, check:false});
            }
            }
            $scope.item="";
            checkCompleteFabButton();
            $('#item').focus();
            //var objDiv = document.getElementById("groceryListPrint");
            //objDiv.scrollTop = objDiv.scrollHeight;
    }
    $scope.removeItem = function (x) {
        $scope.products.splice(x, 1);
        checkCompleteFabButton();
    }
    $scope.checkItem = function (y) {
        if($scope.products[y].check == false){
            $scope.products[y].check=true;
            $('#i'+y.toString()).addClass('check-item');
            $('#x'+y.toString()).addClass('disable-btn');
        }else{
            $scope.products[y].check=false;
            $('#i'+y.toString()).removeClass('check-item');
            $('#x'+y.toString()).removeClass('disable-btn');
        }
        checkCompleteFabButton();
    }
    function checkCompleteFabButton(){
        var checkAll=null;
        for(var i=0;i<$scope.products.length;i++){
            if($scope.products[i].check == true){
                checkAll++;
            }
        }
        if(checkAll==$scope.products.length){
            $('#completeBtn').css('transform','scale(1)');
        }else{
            $('#completeBtn').css('transform','scale(0)');
        }
    }
    $('#completeBtn').click(function(){
        $('#totalSpent').val('');
    })
    $scope.saveData=function(){
        var totalCurrency=$('#totalSpent').val();
        if(totalCurrency!='')
        {
            var totalItem='',totalQty='';
            for(var i=0;i<$scope.products.length;i++)
            {
                totalItem+=$scope.products[i].item + ';'; 
                totalQty+=$scope.products[i].numberitem + ';'; 
            }
        }
        else
        {
             $("#totalSpent").addClass("errorblankInpt");
            setTimeout(function ()
            {
                $('#totalSpent').removeClass('errorblankInpt');
            }, 1000);
        }
    }
})