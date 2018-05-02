angular.module('nGgroceryList').constant('appCostants', {
    websiteUrl:'http://grocerylistweb.altervista.org/#!/sign-up',
    loaderIconBtn:"<i class='fa fa-lg fa-spinner fa-spin'></i>",
    loginServerUrl:'../../server/login_user.php', //http://grocerylistweb.altervista.org/App-Server/server/login_user.php',
    loginDefault:'Sign in',
    toastLoginIncorrect:'Incorrect username or password',
    toastLoginError:'Something went wrong try again later',
    groceryServerUrl:'../../server/store_data_user.php',
    saveDataBtnDefault:'Save',
    toastSaveError:'Error try again later',
    toastSaveSuccess:'Data Saved',
    dashboardServerUrl:'../../server/get_data_user.php',
    dashboardError:'No data saved yet!',
    dashboardFail:"Ups! an error occured <i class='fa fa-frown-o'></i> <br> Try again later"
});