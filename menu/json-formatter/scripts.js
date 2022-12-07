"use strict";

const refs = {
  button: document.querySelector("#json_beautifier"),
  textInput: document.querySelector("#text"),
  textOutput: document.querySelector("#result")
};

console.log(refs);

function trimString(string) {
  return string.trim();
}

function convertString(e) {
  e.preventDefault();
  
  refs.textOutput.value = "";
  const textInput = refs.textInput.value;
  let input;

  // Is it JSON
  try {
    input = JSON.parse(trimString(textInput));
  } catch(e) {
    console.warn("Not valid JSON");
    console.dir(e);
  }

  // Is it a JS literal
  if (!input) {
    const parseRelaxedJSON = (str) => eval('(_ => (' + str + '))()')

    try {
      input = parseRelaxedJSON(textInput);
    } catch(e) {
      console.warn("Not valid JS string");
      console.dir(e);
    }
  }

  try {
    refs.textOutput.value = JSON.stringify(input, null, "  ");
  }
  catch (e) {
    refs.textOutput.value = "Can not parse input string.";
    console.dir(e);
  }
}

refs.button.addEventListener("click", convertString);