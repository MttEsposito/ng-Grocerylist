angular.module('nGgroceryList').constant('appCostants', {
    websiteUrl:"https://www.google.com",
    loaderIconBtn:"<i class='fa fa-lg fa-spinner fa-spin'></i>",
    loginServerUrl:"../../server/login_user.php",
    loginDefault:"Sign in",
    toastLoginIncorrect:"Incorrect username or password",
    toastLoginError:"Something went wrong try again later",
    groceryServerUrl:"../../server/store_data_user.php",
    saveDataBtnDefault:"Save",
    toastSaveError:"Error try again later",
    toastSaveSuccess:"Data Saved",
    dashboardServerUrl:"../../server/get_data_user.php",
    dashboardError:"No data saved yet!",
    dashboardFail:"Ups! an error occured <i class='fa fa-frown-o'></i> <br> Try again later"
});