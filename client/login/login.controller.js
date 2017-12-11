angular.module('nGgroceryList').controller('loginCtrl', function($scope,$http,$kookies,$state) {
    $scope.sendLogin=function(){
        var emailUser = $('#emailUser').val();
        var passwordUser = $('#passwordUser').val()
        if(emailUser != "" && passwordUser != ""){
            $http({
            method : "GET",
            url : "../../server/login_user.php",
            params: {
                email: emailUser,
                password: passwordUser
            },
        })
        .then(function(response) {
            console.log(response)
            if(response.data!="error"){
                $kookies.set('sessionLog', 'set');
                $kookies.set('user', response.data);
                $(".navbarApp").slideDown("slow");
                $('.userName').html($kookies.get('user'))
                $state.go('dashboard')
            }
        })
        .catch(function(err){
            console.log(err)
        })
        }else{
            
        }
    }
})