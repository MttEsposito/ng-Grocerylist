angular.module('nGgroceryList').service('loginSrv', function($http,$q) {
   //check for the blank input
   this.checkBlankInput=function(emailUser,passwordUser){
       if(emailUser == "" && passwordUser == ""){
                $("#emailUser").addClass("errorblankInpt");
                setTimeout(function () {
                    $('#emailUser').removeClass('errorblankInpt');
                }, 700);
                $("#passwordUser").addClass("errorblankInpt");
                setTimeout(function () {
                    $('#passwordUser').removeClass('errorblankInpt');
                }, 700);
            }
            if(emailUser == ""){
                $("#emailUser").addClass("errorblankInpt");
                setTimeout(function () {
                    $('#emailUser').removeClass('errorblankInpt');
                }, 700);
            }
            if(passwordUser == ""){
                $("#passwordUser").addClass("errorblankInpt");
                setTimeout(function () {
                    $('#passwordUser').removeClass('errorblankInpt');
                }, 700);
            }
   }
   //function for exec the login 
   this.loginExec=function(configHttp){
        let config=configHttp;
        return $q(function(resolve,reject){
            let startAjaxCall=function(){
                $http(config)
                .then(successResult)
                .catch(failResult)
            };
            let successResult=function(res){
                resolve(res);
            };
            let failResult=function(err){
                reject(err);
            };
            startAjaxCall();
        });
   }
   //show the toast app on error input worng email/psw or ajax fail
   this.showToastApp=function(textToast){
       let toast;
       toast = document.getElementById("appToast");
       toast.innerHTML=textToast;
       toast.className = "show";
       setTimeout(function(){
           toast.className = toast.className.replace("show", "");
       }, 4000);
   }
})