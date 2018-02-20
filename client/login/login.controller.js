angular.module('nGgroceryList').controller('loginCtrl', function($scope,$http,$kookies,$state) {
    $scope.rgisterUrl = 'http://google.com';
    $scope.sendLogin=function(){
        let emailUser = $('#emailUser').val();
        let passwordUser = $('#passwordUser').val()
        if(emailUser != "" && passwordUser != ""){
            $('#btnLogin').html("<i class='fa fa-lg fa-spinner fa-spin'></i>");
            $('#btnLogin').addClass('disBtn');
            $http({
            method : "GET",
            url : "../../server/login_user.php",
            cache:false,
            params: {
                email: emailUser,
                password: passwordUser
            },
            })
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
                    let toast = document.getElementById("appToast");
                    toast.innerHTML="Incorrect username or password";
                    toast.className = "show";
                    setTimeout(function(){
                    toast.className = toast.className.replace("show", "");
                    }, 5000);
                }
            })
            .catch(function(err){
                    $('#btnLogin').html("Login");
                    let toast = document.getElementById("appToast");
                    toast.innerHTML="Something wrong try again later";
                    toast.className = "show";
                    setTimeout(function(){
                    toast.className = toast.className.replace("show", "");
                    }, 5000);
        })
        }else{
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
    }
})