angular.module('nGgroceryList').service('ajaxSrv', function($http,$q) {
    //function for made httpcall
	this.execAjax = function(configHttp){
        let config = configHttp;
        return $q(function(resolve,reject){
            function startAjaxCall(){
                $http(config)
                .then(successResult)
                .catch(failResult)
            };
            function successResult(res){
                resolve(res);
            };
            function failResult(err){
                reject(err);
            };
            startAjaxCall();
        });
    }
});