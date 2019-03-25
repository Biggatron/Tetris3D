// =================
// KEYBOARD HANDLING
// =================

var keys = [];

function handleKeydown(evt) {
    keys[evt.keyCode] = true;
}

function handleKeyup(evt) {
    keys[evt.keyCode] = false;
}

// Inspects, and then clears, a key's state
function eatKey(keyCode) {
    var isDown = keys[keyCode];
    keys[keyCode] = false;
    return isDown;
}

// A tiny little convenience function
function keyCode(keyChar) {
    return keyChar.charCodeAt(0);
}

var KEY_LEFT_ARROW = '37';
var KEY_UP_ARROW = '38';
var KEY_RIGHT_ARROW = '39';
var KEY_DOWN_ARROW = '40';

var KEY_ROTATE_X = keyCode('A');
var KEY_ROTATE_X_C = keyCode('Z');
var KEY_ROTATE_Y = keyCode('S');
var KEY_ROTATE_Y_C = keyCode('X');
var KEY_ROTATE_Z = keyCode('D');
var KEY_ROTATE_Z_C = keyCode('C');

window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);
