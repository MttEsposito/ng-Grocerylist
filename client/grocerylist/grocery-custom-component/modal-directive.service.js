angular.module('nGgroceryList').service('modalGrocerySrv', function($http,$q,appCostants) {
    //function for exec the login 
    this.storeDataGrocery=function(configHttp){
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
    //show the toast app on error input worng email/psw or ajax fail
    this.showToastApp=function(textToast){
       let toast = document.getElementById("appToastGro");
       toast.innerHTML=textToast;
       toast.className = "show";
       setTimeout(function(){
           toast.className = toast.className.replace("show", "");
       }, 4000);
   }
   //set enable disable button save on click
   this.btnStoreDataEvent=function(number){
       if(number== 0){
           $('#saveDataBtn').html(appCostants.loaderIconBtn);
           $('#saveDataBtn').addClass('disBtn');
       }else{
           $('#saveDataBtn').removeClass('disBtn');
           $('#saveDataBtn').html(appCostants.saveDataBtnDefault);
       }
   }

});