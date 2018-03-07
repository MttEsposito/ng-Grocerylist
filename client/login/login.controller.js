angular.module('nGgroceryList').controller('loginCtrl', function($scope,$http,$state,loginSrv) {
    $scope.rgisterUrl = 'http://google.com';
    $scope.sendLogin=function(){
        let passwordUser,emailUser,config;
        emailUser = $('#emailUser').val();
        passwordUser = $('#passwordUser').val();
        if(emailUser != "" && passwordUser != ""){
            $('#btnLogin').html("<i class='fa fa-lg fa-spinner fa-spin'></i>");
            $('#btnLogin').addClass('disBtn');
            config= {method : "POST",url : "../../server/login_user.php",cache:false,headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},data: {email: emailUser,password: passwordUser}};
            $http(config)
            .then(function(response) {
                $('#btnLogin').removeClass('disBtn');
                $('#btnLogin').html("Sign in");
                if(response.data.userid!="error"){
                    let appStorage = window.localStorage;
                    appStorage.setItem('sessionLog', 'set');
                    appStorage.setItem('user', response.data.name);
                    appStorage.setItem('userId', response.data.userid);
                    $(".navbarApp").slideDown("slow");
                    $('.userName').html(appStorage.getItem('user'));
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