angular.module('nGgroceryList').directive('userLogOut',function($state){
      return{
          link:function(scope, element, attrs){
            element.click(function(){
                    $('body').append("<close><center><div class='loader'></div><center></close>");
                    window.localStorage.removeItem("user");
                    window.localStorage.removeItem("userId");
                    window.localStorage.setItem('sessionLog', 'unset');
                    setTimeout(function(){
                        $(".navbarApp").css("display","none");
                        $state.go('login');
                        $('close').remove();
                },1500)
            }); 
        }
    }
});