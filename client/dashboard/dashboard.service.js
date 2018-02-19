angular.module('nGgroceryList').service('dashSrv', function() {
    //function for get the max price spent
    this.maX = function (dataArrayPrice) { 
        return (Math.max.apply(null,dataArrayPrice.map(Number))).toFixed(2);
    };
    // function for get the min price spent
    this.miN= function(dataArrayPrice){
         console.log('min')
        return (Math.min.apply(null,dataArrayPrice.map(Number))).toFixed(2);
    };
    //function for get the average price spent
    this.avG=function(dataArrayPrice){
        return (dataArrayPrice.map(Number).reduce((a, b) => a + b, 0)/dataArrayPrice.map(Number).length).toFixed(2);
    }
})