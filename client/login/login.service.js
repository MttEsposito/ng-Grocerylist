angular.module('nGgroceryList').service('loginSrv', function() {
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