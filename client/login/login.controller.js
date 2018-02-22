angular.module('nGgroceryList').controller('loginCtrl', function($scope,$http,$kookies,$state,loginSrv) {
    $scope.rgisterUrl = 'http://google.com';
    $scope.sendLogin=function(){
        let emailUser = $('#emailUser').val();
        let passwordUser = $('#passwordUser').val()
        if(emailUser != "" && passwordUser != ""){
            $('#btnLogin').html("<i class='fa fa-lg fa-spinner fa-spin'></i>");
            $('#btnLogin').addClass('disBtn');
            let config= {method : "GET",url : "../../server/login_user.php",cache:false,params: {email: emailUser,password: passwordUser}};
            $http(config)
            .then(function(response) {
                $('#btnLogin').removeClass('disBtn');
                $('#btnLogin').html("Login");
                if(response.data.userid!="error"){
                    $kookies.set('sessionLog', 'set');
                    $kookies.set('user', response.data.name);
                    $(".navbarApp").slideDown("slow");
                    $('.userName').html($kookies.get('user'));
                    $state.go('grocerylist');
                }else{
                    loginSrv.showToastApp("Incorrect username or password");
                }
            })
            .catch(function(err){
                    $('#btnLogin').html("Login");
                    loginSrv.showToastApp("Something went wrong try again later");
        })
        }else{
            loginSrv.checkBlankInput(emailUser,passwordUser);
        }
    }
})