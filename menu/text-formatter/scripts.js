"use strict";

const TitleCase = (string) => {
    var result = [];
    var a = string.toLowerCase().split(" ");
    for(let i = 0; i < a.length; i++){
        a[i] = a[i][0].toUpperCase() + a[i].substr(1); 
        result.push(a[i]);
      }

    return result.join(' ');
};
const SentenceCase = (string) => {
    var result = [];
    let words = string.toLowerCase().split(" ");
    let newsentence = true;
    for(let i = 0; i < words.length; i++){
      if (newsentence==true || words[i]=="i"){
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        newsentence = false;
      } 
      if (words[i][words[i].length-1] === "." || words[i][words[i].length-1] === "?" || words[i][words[i].length-1] === "!" ){            
        newsentence = true;
      }
    }
    return words.join(" ");
};

const Trim = (string) => {
    var newString = string.replace(/\s+/g,' ').trim();
    return newString
};

var textarea = document.getElementById("text");

document.getElementById("lower").addEventListener("click", function(){
    textarea.value = textarea.value.toLowerCase();
});
  
document.getElementById("upper").addEventListener("click", function(){
    textarea.value = textarea.value.toUpperCase();
});

document.getElementById("sentence").addEventListener("click", function(){
    textarea.value = SentenceCase(textarea.value);
});

document.getElementById("title").addEventListener("click", function(){
    textarea.value = TitleCase(textarea.value);
});

document.getElementById("base64_encode").addEventListener("click", function(){
    textarea.value = btoa(textarea.value);
});
  
document.getElementById("base64_decode").addEventListener("click", function(){
    textarea.value = atob(textarea.value);
});

document.getElementById("trim").addEventListener("click", function(){
    textarea.value = Trim(textarea.value);
    console.log(textarea.value)
});

document.getElementById("bold").addEventListener("click", function(){
    textarea = textarea.style.fontWeight = 'bold';
});

document.getElementById("italic").addEventListener("click", function(){
    textarea = textarea.style.fontStyle = 'italic';
});

document.getElementById("normal").addEventListener("click", function(){
    textarea = textarea.style.fontStyle = 'normal';
});