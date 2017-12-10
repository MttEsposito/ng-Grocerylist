angular.module('nGgroceryList', ['ngMaterial','ui.router','ngResource','ngKookies'])
//on run set default page Login 
.run(["$state",function($state){
      $state.go('login');
         }
     ])
//set the routing on the webapp
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      controller: 'loginCtrl',
      controllerAs: 'loginCtrl',
      url: '/login',
      templateUrl: 'client/login/login.html',
      onEnter :'',
      onExit :'',
    })
    //on diferent url location redirect to homepage
    $urlRouterProvider.otherwise('/dashboard');
})
