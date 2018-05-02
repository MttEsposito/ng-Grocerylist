let eventKeyboard = window.addEventListener;
eventKeyboard('keyboardWillShow', () => {
    $('#groceryListPrint').css('max-height','165px');
});
eventKeyboard('keyboardWillHide', () => {
    $('#groceryListPrint').css('max-height','455px');
});