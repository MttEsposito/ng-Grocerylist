// bind the event of cordova deviceready for reset the resource on app start and call the function
function clearResource() {
    document.addEventListener("deviceready", clearDataRes, false);
}
// function for clean up data on app start
function clearDataRes(){
    $.cookie('sessionLog', 'unset');
    $.cookie('user', '');
    $.ajax({
        method:'GET',
        cache:false,
        url:'server/logout_user.php',
    })
    .then(function(response){/*do nothing*/})
    .catch(function(error){/*do nothing*/})
}