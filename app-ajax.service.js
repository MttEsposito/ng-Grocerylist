angular.module('nGgroceryList').service('ajaxSrv', function($http,$q) {
    //function for made httpcall
	this.execAjax=function(configHttp){
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
});