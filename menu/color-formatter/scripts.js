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

function rgbTohsv (r,g,b) {
    var computedH = 0;
    var computedS = 0;
    var computedV = 0;
   
    //remove spaces from input RGB values, convert to int
    var r = parseInt( (''+r).replace(/\s/g,''),10 ); 
    var g = parseInt( (''+g).replace(/\s/g,''),10 ); 
    var b = parseInt( (''+b).replace(/\s/g,''),10 ); 
   
    r=r/255; g=g/255; b=b/255;
    var minRGB = Math.min(r,Math.min(g,b));
    var maxRGB = Math.max(r,Math.max(g,b));
   
    // Black-gray-white
    if (minRGB==maxRGB) {
     computedV = minRGB;
     return `hsv(0,0,${computedV})`;
    }
   
    // Colors other than black-gray-white:
    var d = (r==minRGB) ? g-b : ((b==minRGB) ? r-g : b-r);
    var h = (r==minRGB) ? 3 : ((b==minRGB) ? 1 : 5);
    computedH = 60*(h - d/(maxRGB - minRGB));
    computedS = (maxRGB - minRGB)/maxRGB;
    computedV = maxRGB;
    return `hsv(${computedH},${computedS},${computedV})`;
}

function fill(){
    var color_val = document.getElementById("color");
    var red_val = document.getElementById("red").value
    var green_val = document.getElementById("green").value
    var blue_val = document.getElementById("blue").value
    color_val.style.background = `rgb(${red_val}, ${green_val}, ${blue_val})`;
    rgb.innerHTML = `rgb(${red_val}, ${green_val}, ${blue_val})`;
    hsv.innerHTML = rgbTohsv(red_val, green_val, blue_val);
    hex.innerHTML = rgbToHex(red_val, green_val, blue_val);
    console.log(red_val,green_val,blue_val)
}

var rgb = document.getElementById("rgb");
var hsv = document.getElementById("hsv")
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