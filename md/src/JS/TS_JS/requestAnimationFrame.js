"use strict";
var element;
var startStamp;
// document.ready = () => {
//     rotate()
// }
window.onload = function () {
    console.log('onload');
    rotate();
};
function rotate() {
    element = document.getElementById('animate');
    requestAnimationFrame(animate);
}
function animate(timestamp) {
    if (startStamp == undefined) {
        startStamp = timestamp;
    }
    var elapsed = timestamp - startStamp;
    if (element != null) {
        element.style.transform = "rotate(" + 0.01 * elapsed + "deg)";
    }
    requestAnimationFrame(animate);
}
