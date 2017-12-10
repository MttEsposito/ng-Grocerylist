angular.module('nGgroceryList').controller('loginCtrl', function($scope,$http) {
    $scope.sendLogin=function(){
        var emailUser = $('#emailUser').val();
        var passwordUser = $('#passwordUser').val()
        if(emailUser != "" && passwordUser != ""){
            $http({
            method : "GET",
            url : "../../server/login_user.php",
            params: {
                email: emailUser,
                passowrd: passwordUser
            },
        })
        .then(function(response) {
            console.log(response)
        })
        .catch(function(err){
            console.log(err)
        })
        }else{
           console.log("error") 
        }
    }
})