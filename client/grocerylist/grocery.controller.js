angular.module('nGgroceryList').controller('groceryCtrl', function($scope,$http,$kookies,$state,$timeout) {
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
            $timeout(function() {
              $("#groceryListPrint").scrollTop($("#groceryListPrint")[0].scrollHeight);
            }, 0, false);
    }
    $scope.removeItem = function (x) {
        $scope.products.splice(x, 1);
        checkCompleteFabButton();
    }
    $scope.addNum=function(e){
        $scope.products[e].numberitem=$scope.products[e].numberitem+1;
    }
    $scope.removeNum=function(e){
        if($scope.products[e].numberitem!=1){
        $scope.products[e].numberitem=$scope.products[e].numberitem-1;
        }
    }
    $scope.checkItem = function (y,z) {
        if(z.target.classList[0]=='myItem')
        {
            if($scope.products[y].check == false)
            {
                $scope.products[y].check=true;
                $('#i'+y.toString()).addClass('check-item');
                $('#x'+y.toString()).addClass('disable-btn');
                $('#r'+y.toString()).addClass('disable-btn');
                $('#a'+y.toString()).addClass('disable-btn');
            }
            else
            {
                $scope.products[y].check=false;
                $('#i'+y.toString()).removeClass('check-item');
                $('#x'+y.toString()).removeClass('disable-btn');
                $('#r'+y.toString()).removeClass('disable-btn');
                $('#a'+y.toString()).removeClass('disable-btn');
            }
            checkCompleteFabButton();
        }
        else{
            
        }
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
            var resItem=totalItem.substring(0, totalItem.length-1);
            var resQty=totalQty.substring(0, totalQty.length-1);
            $('#saveDataBtn').html("<i class='fa fa-lg fa-spinner fa-spin'></i>");
            $http({
            method : "GET",
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
                if(response.data.success=="success"){
                    $('#completeBtn').css('transform','scale(0)');
                var toast = document.getElementById("appToastGro");
                    toast.innerHTML="Data Saved";
                    toast.className = "show";
                    setTimeout(function(){
                    toast.className = toast.className.replace("show", "");
                    }, 5000);
                    $scope.products = [];
                }else{
                    var toast = document.getElementById("appToastGro");
                    toast.innerHTML="Error try again later";
                    toast.className = "show";
                    setTimeout(function(){
                    toast.className = toast.className.replace("show", "");
                    }, 5000);
                }
            })
            .catch(function(err){
                var toast = document.getElementById("appToastGro");
                    toast.innerHTML="Error try again later";
                    toast.className = "show";
                    setTimeout(function(){
                    toast.className = toast.className.replace("show", "");
                    }, 5000);
            })
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
    $scope.checkKeyInput=function(x){
        if(x.which >= 65 && x.which <= 122){ 
        }else{
            event.preventDefault(); 
        }
    }
})