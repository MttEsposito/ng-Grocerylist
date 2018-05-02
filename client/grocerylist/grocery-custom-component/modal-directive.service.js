angular.module('nGgroceryList').service('modalGrocerySrv', function(appCostants) {
    //show the toast app on error input worng email/psw or ajax fail
    this.showToastApp = function(textToast){
       let toast = document.getElementById('appToastGro');
       toast.innerHTML = textToast;
       toast.className = 'show';
       setTimeout(function(){
           toast.className = toast.className.replace('show', '');
       }, 4000);
   }
   //set enable disable button save on click
   this.btnStoreDataEvent = function(number){
       if(number == 0){
           $('#saveDataBtn').html(appCostants.loaderIconBtn).addClass('disBtn');
       }else{
           $('#saveDataBtn').html(appCostants.saveDataBtnDefault).removeClass('disBtn');
       }
   }
});