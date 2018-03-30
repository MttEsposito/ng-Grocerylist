angular.module('nGgroceryList').directive('userLogOut',function($state){
      return{
          link:function(scope, element, attrs){
            element.click(function(){
                    let appStorage = window.localStorage;
                    $('body').append("<close><center><div class='loader'></div><center></close>");
                    appStorage.removeItem("user");
                    appStorage.removeItem("userId");
                    appStorage.setItem('sessionLog', 'unset');
                    setTimeout(function(){
                        $(".navbarApp").css("display","none");
                        $state.go('login');
                        $('close').remove();
                },1500)
            }); 
        }
    }
});