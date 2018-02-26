window.addEventListener('keyboardWillShow', () => {
    $('#groceryListPrint').css('max-height','165px');
});
window.addEventListener('keyboardWillHide', () => {
    $('#groceryListPrint').css('max-height','455px');
});