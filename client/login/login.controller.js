angular.module('nGgroceryList').controller('loginCtrl', function($q,$scope,$state,loginSrv,appCostants) {
    $scope.rgisterUrl = appCostants.websiteUrl;
    $scope.sendLogin=function(){
        let passwordUser,emailUser,config;
        emailUser = $('#emailUser').val();
        passwordUser = $('#passwordUser').val();
        if(emailUser != "" && passwordUser != ""){
            loginSrv.btnSignInEvent(0);
            
            config = {
                method : "POST",
                url : appCostants.loginServerUrl,
                cache:false,
                headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
                data: {email: emailUser,password: passwordUser}
            };
            loginSrv.loginExec(config)
            .then(function(response){
                loginSrv.btnSignInEvent(1);
                if(response.data.userid!="error"){
                    let appStorage = window.localStorage;
                    appStorage.setItem('sessionLog', 'set');
                    appStorage.setItem('user', response.data.name);
                    appStorage.setItem('userId', response.data.userid);
                    $(".navbarApp").slideDown("slow");
                    $('.userName').html(appStorage.getItem('user'));
                    $state.go('grocerylist');
                }else{
                    loginSrv.showToastApp(appCostants.toastLoginIncorrect);
                }
            })
            .catch(function(fail){
                loginSrv.btnSignInEvent(1);
                loginSrv.showToastApp(appCostants.toastLoginError);

            });
        }else{
            loginSrv.checkBlankInput(emailUser,passwordUser);
        }
    }
})