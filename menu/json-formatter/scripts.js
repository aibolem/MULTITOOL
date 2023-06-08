"use strict";

const refs = {
  json_beautifier: document.querySelector("#json_beautifier"),
  json_paragraph_convert: document.querySelector("#json_paragraph_convert"),
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

function paragraphToJson() {
  const textarea = refs.textInput;
  const content = textarea.value;
  
  // Split the content by newline (\n) character
  const lines = content.split(/\r?\n/);
  
  // Create an empty JavaScript object
  const json = {};
  
  // Iterate over the lines and assign each line as a new key in the JSON object
  for (let i = 0; i < lines.length; i++) {
    json[`line${i + 1}`] = lines[i];
  }
  
  // Convert the JavaScript object to JSON string  
  try {
    refs.textOutput.value = JSON.stringify(json);
  }
  catch (e) {
    refs.textOutput.value = "Can not parse input string.";
    console.dir(e);
  }
}

refs.json_beautifier.addEventListener("click", convertString);
refs.json_paragraph_convert.addEventListener("click", paragraphToJson);