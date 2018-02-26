angular.module('nGgroceryList', ['ngMaterial', 'ui.router', 'ngResource', 'ngKookies','ngSanitize'])
  //on run set default page Login 
  .run(["$state", function($state) {
    $state.go('login');
  }])
  //set the routing on the webapp
  .config(function($stateProvider, $urlRouterProvider) {
    // state app of the login
    $stateProvider
      .state('login', {
        controller: 'loginCtrl',
        controllerAs: 'loginCtrl',
        url: '/login',
        templateUrl: 'client/login/login.html',
        onEnter: function($state){
         if($.cookie('sessionLog')=='set'){
           $state.go('grocerylist');
         }
        },
        onExit: '',
      })
      // state dashboard for data user
      .state('dashboard', {
        controller: 'dashCtrl',
        controllerAs: 'dashCtrl',
        url: '/dashboard',
        templateUrl: 'client/dashboard/dashboard.html',
        onEnter: function($state){
         if($.cookie('sessionLog')!='set'){
           $state.go('login');
         }else{
             $(".navbarApp").css("display","block");
             $('.userName').html($.cookie('user'))
         }
         $('#dashboard').addClass('btnTabAct');
        },
        onExit: function(){
            $('#dashboard').removeClass('btnTabAct');
        },
      })
      // state grocerylist core of the app
       .state('grocerylist', {
        controller: 'groceryCtrl',
        controllerAs: 'groceryCtrl',
        url: '/grocerylist',
        templateUrl: 'client/grocerylist/grocery.html',
        onEnter: function($state){
         if($.cookie('sessionLog')!='set'){
           $state.go('login');
         }else{
             $(".navbarApp").css("display","block");
             $('.userName').html($.cookie('user'))
         }
         $('#grocery').addClass('btnTabAct');
        },
        onExit: function(){
            $('#grocery').removeClass('btnTabAct');
        },
      })
      //on error location redirect
      $urlRouterProvider.otherwise(function($injector, $location){
         let state = $injector.get('$state');
         if($.cookie('sessionLog')=='set'){
           state.go('grocerylist');
         }else{
           state.go('login');
         }
         return $location.path();
    });
  })
  //directive function for the logout button in the navbar
.directive("userLogOut",function ($http,$kookies,$state) {
  return{
    link:function(scope, element, attrs){
        element.click(function(){
            if($kookies.get('sessionLog')=="set"){
                $('body').append("<close><center><div class='loader'></div><center></close>");
            $http({
            cache:false,
            method : "GET",
            url : "server/logout_user.php",
            })
            .then(function(response) {
                $(".navbarApp").css("display","none"); 
                $kookies.set('sessionLog', 'unset');
                $kookies.set('user', '');
                $state.go('login');
                $('close').remove();
            })
            }
          }); 
    }
  }
})
