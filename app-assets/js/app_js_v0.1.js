window.addEventListener('keyboardWillShow', () => {
    $('#groceryListPrint').css('max-height','165px');
});
window.addEventListener('keyboardWillHide', () => {
    $('#groceryListPrint').css('max-height','455px');
});
function setNavTabActive(idBtnElement){
    $('.navTab').find('.btnTabAct').removeClass('btnTabAct');
    $('#'+idBtnElement).addClass('btnTabAct');
}