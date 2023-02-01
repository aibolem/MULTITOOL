"use strict";
var textarea = document.getElementById("text");

const inputFile = document.querySelector("#image");
const pictureImage = document.querySelector(".display-image");
const pictureImageTxt = "Choose an image";
pictureImage.innerHTML = pictureImageTxt;

inputFile.addEventListener("change", function (e) {
  const inputTarget = e.target;
  const file = inputTarget.files[0];

  if (file) {
    const reader = new FileReader(); 

    reader.addEventListener("load", function (e) {
        textarea.value = reader.result
        const readerTarget = e.target;

        const img = document.createElement("img");
        img.src = readerTarget.result;
        img.classList.add("display-img");

        pictureImage.innerHTML = "";
        pictureImage.appendChild(img);
    });

    reader.readAsDataURL(file);
  } else {
    pictureImage.innerHTML = pictureImageTxt;
  }
});
