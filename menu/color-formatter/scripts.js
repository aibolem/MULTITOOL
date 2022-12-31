"use strict";
function colorToHex(rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
}

function rgbToHex(r, g, b) {
    var R = colorToHex(r);
    var G = colorToHex(g);
    var B = colorToHex(b);
    return `#${R}${G}${B}`;
}

function fill(){
    var color_val = document.getElementById("color");
    var red_val = document.getElementById("red").value
    var green_val = document.getElementById("green").value
    var blue_val = document.getElementById("blue").value
    color_val.style.background = `rgb(${red_val}, ${green_val}, ${blue_val})`;
    rgb.innerHTML = `rgb(${red_val}, ${green_val}, ${blue_val})`;
    hex.innerHTML = rgbToHex(red_val, green_val, blue_val);
    console.log(red_val,green_val,blue_val)
}

var rgb = document.getElementById("rgb");
var hex = document.getElementById("hex");

document.getElementById("red").oninput = function() {
    fill()
};
document.getElementById("blue").oninput = function() {
    fill()
};
document.getElementById("green").oninput = function() {
    fill()
};