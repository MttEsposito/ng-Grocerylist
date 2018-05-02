angular.module('nGgroceryList').service('dashSrv', function() {
    let myChart;
    //function for get the max price spent
    this.maX = function (dataArrayPrice) { 
        return (Math.max.apply(null,dataArrayPrice.map(Number))).toFixed(2);
    }
    // function for get the min price spent
    this.miN = function(dataArrayPrice){
        return (Math.min.apply(null,dataArrayPrice.map(Number))).toFixed(2);
    }
    //function for get the average price spent
    this.avG = function(dataArrayPrice){
        return (dataArrayPrice.map(Number).reduce((a, b) => a + b, 0)/dataArrayPrice.map(Number).length).toFixed(2);
    }
    // function for create the recap list in the dashboard
    this.recapList = function(recapPrint){
        let resData = '';
        	for (let index of recapPrint)
            {
            	if(Array.isArray(index.item))
            	{
            		resData += "<div class='recaplist'><div class='groDate'>Grocery list date : " + index.date + "</div>";
            			let subIndexLen = index.item.length
	            		for(let i=0; i<subIndexLen; i++)
	            		{	
	            			resData += "<div><div class='item'>Item " + index.item[i] + "</div><div class='qty'>Number " + index.qty[i] + "</div></div>";
	            		}
            		resData = resData + "</div>";
            	}else
            	{
            		resData += "<div class='recaplist'><div class='groDate'>Grocery list date : " + index.date + "</div><div class='item'>Item " + index.item + "</div> <div class='qty'>Number " + index.qty + "</div></div>";
            	}
            }
        return resData;
    }
    //function for create the chart data in the dashboard
    this.chartCreate = function(dataX,dataY){
        if(myChart != undefined){
            myChart.destroy();
        }
 		let canvas = document.getElementById('chartPrint');
    	let dataChart = 
    	 {
    	 	labels : dataX,
    	 	datasets : 
    	 	[
		    	{
		          label : 'Shopping History',
		          fill : true,
		          lineTension : 0,
		          backgroundColor : 'rgba(26, 188, 156,0.3)',
		          borderColor : '#1ABC9C',
		          pointBorderColor : '#1ABC9C',
		          pointBorderWidth : 1,
    			  pointHoverRadius : 5,
		          pointBackgroundColor : '#fff',
		          pointHoverBackgroundColor : 'rgba(75,192,192,1)',
				  pointHoverBorderColor : 'rgba(220,220,220,1)',
				  pointHoverBorderWidth : 2,
				  pointRadius : 6,
				  pointHitRadius : 7,
		          data : dataY,
		        }
		    ]
	    };
	    let option;
	    if(dataX.length > 4)
	    {
	    	$('xaxes').removeClass('hide')
	    	option =
	        {
	    		scales :
            	{
					xAxes : 
					[{
		            	display : false
		            }]
                },
	    	}
	    }
	    else
	    {
	     $('xaxes').addClass('hide')
	    }
		myChart = new Chart(canvas, {
			type : 'line',
		    data : dataChart,
		    options : option,
		})
		return myChart;
 	 }
})