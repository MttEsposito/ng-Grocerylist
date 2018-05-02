angular.module('nGgroceryList', ['ngMaterial', 'ui.router', 'ngResource', 'ngSanitize'])
  //set the routing on the webapp
  .config(function($stateProvider, $urlRouterProvider) {
    // state app of the login
    $stateProvider
      .state('login', {
        url: '/',
        controller: 'loginCtrl',
        controllerAs: 'loginCtrl',
        templateUrl: 'client/login/login.html',
        onEnter: function($state){
            if(window.localStorage.getItem('sessionLog') == 'set'){
                $state.go('grocerylist')
            }
        },
        onExit: '',
      })
      // state dashboard for data user
      .state('dashboard', {
        url: '/dashboard',
        controller: 'dashCtrl',
        controllerAs: 'dashCtrl',
        templateUrl: 'client/dashboard/dashboard.html',
        onEnter: function($state){
         if(window.localStorage.getItem('sessionLog') != 'set'){
           $state.go('login');
         }else{
            $('.navbarApp').css('display','block');
            $('.userName').html(window.localStorage.getItem('user'));
            $('.navTab').find('.btnTabAct').removeClass('btnTabAct');
            $('#dashboard').addClass('btnTabAct');
         }
        },
        onExit: '',
      })
      // state grocerylist core of the app
       .state('grocerylist', {
        url: '/grocerylist',
        controller: 'groceryCtrl',
        controllerAs: 'groceryCtrl',
        templateUrl: 'client/grocerylist/grocery.html',
        onEnter: function($state){
         if(window.localStorage.getItem('sessionLog') != 'set'){
           $state.go('login');
         }else{
            $('.navbarApp').css('display','block');
            $('.userName').html(window.localStorage.getItem('user'));
            $('.navTab').find('.btnTabAct').removeClass('btnTabAct');
            $('#grocerylist').addClass('btnTabAct');
         }
        },
        onExit: '',
      })
      //on error location redirect
      $urlRouterProvider.otherwise(function($injector, $location){
        let state = $injector.get('$state');
        if(window.localStorage.getItem('sessionLog') == 'set'){
            $location.path('/grocerylist');
        }else{
            $location.path('/');
        }
        return $location.path();
    });
});
