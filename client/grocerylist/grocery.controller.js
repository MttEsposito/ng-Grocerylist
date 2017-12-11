angular.module('nGgroceryList').controller('groceryCtrl', function($scope,$http,$kookies,$state) {
    $scope.products = [];
     $scope.addItem = function () {
        if($("#item").val()=="" || $("#number").val()==""){
          $("#item").addClass("errorblankInpt");
        setTimeout(function () {
            $('#item').removeClass('errorblankInpt');
        }, 1000);
        $("#number").addClass("errorblankInpt");
        setTimeout(function () {
            $('#number').removeClass('errorblankInpt');
        }, 1000);
        }else{
          $scope.products.push({item:$scope.item,numberitem:$scope.number});
          $scope.item="";
          $scope.number="";
        }
    }
    $scope.removeItem = function (x) {
        $scope.products.splice(x, 1);
    } 
})