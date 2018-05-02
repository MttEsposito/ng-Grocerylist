angular.module('nGgroceryList').service('grocerySrv', function() {
   //function for appear the complete button  and the recap list
   this.checkCompleteFabButton = function(arrProd){
       let checkAll = null;
        for(let index of arrProd){
            if(index.check){
                checkAll++;
            }
        }
        if(checkAll == arrProd.length){
            $('#completeBtn').css('transform','scale(1)');
        }else{
            $('#completeBtn').css('transform','scale(0)');
        }
   }
   //function for disable/enable item onclick item
   this.chckIt = function(index,event,arrProd){
    if(event.target.classList[0] == 'myItem')
        {
            if(arrProd[index].check == false)
            {
                arrProd[index].check = true;
                $('#i' + index.toString()).addClass('check-item');
                $('.actBtnGro' + index.toString()).addClass('disable-btn');
            }
            else
            {
                arrProd[index].check = false;
                $('#i' + index.toString()).removeClass('check-item');
                $('.actBtnGro' + index.toString()).removeClass('disable-btn');
            }
        }
   }
   // function for create the array of products
   this.createArrItem = function(arrayItem,itemToPush){
       let itemClean = itemToPush.replace(/[^a-zA-Z ]/gi, '-');
       let addItemCheck;
        if(arrayItem.length > 0)
            {
                for (let indexOne of arrayItem)
                {
                    if(indexOne.item == itemClean)
                    {
                        indexOne.numberitem = indexOne.numberitem + 1;
                        addItemCheck = true;
                    }
                }
                    if(!addItemCheck)
                    {
                        arrayItem.push({item : itemClean,numberitem : 1,check : false});
                    }
                    addItemCheck = false;
                }
                else
                {
                    arrayItem.push({item : itemClean,numberitem : 1, check : false});
                }
       return arrayItem;
   }
   // check blank input on grocery
   this.blankInput = function(idInput){
       $('#' + idInput).addClass('errorblankInpt');
            setTimeout(function () {
            $('#' + idInput).removeClass('errorblankInpt');
        }, 1000);
   }
})