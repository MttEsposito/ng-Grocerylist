angular.module('nGgroceryList').directive('modalComplete',function(){
    return{
        restrict : 'E',
        templateUrl : 'client/grocerylist/grocery-custom-component/modal-directive.html',
        controller : 'modalCtrl',
        controllerAs : 'modalCtrl',
        scope : {products : '='},
    };
});