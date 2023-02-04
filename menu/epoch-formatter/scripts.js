"use strict";
let convertButton;
let unixTime = 0;
let outputISO, outputLocal;

document.addEventListener("DOMContentLoaded", main);

function main() {
  outputISO = document.getElementById("outputISO");
  outputLocal = document.getElementById("outputLocal");
  convertButton = document.getElementById("convertButton");
  convertButton.addEventListener("click", convertClick);
}

function convertClick(ev) {
  let jsDate;
  let UTCYear, UTCMonth, UTCMonthISO, UTCDay, UTCDayISO;
  let UTCHours, UTCHoursISO, UTCMinutes, UTCMinutesISO, UTCSeconds, UTCSecondsISO;
  
  ev.preventDefault();
  unixTime = document.getElementById("numberInput").value;
  jsDate = new Date(unixTime * 1000);
  UTCYear = jsDate.getUTCFullYear();
  UTCMonth = jsDate.getUTCMonth() + 1; // month is index (from 0)
  UTCDay = jsDate.getUTCDate();
  UTCHours = jsDate.getUTCHours();
  UTCMinutes = jsDate.getUTCMinutes();
  UTCSeconds = jsDate.getUTCSeconds();
  
  UTCMonthISO = (UTCMonth < 10) ? "0" + UTCMonth : UTCMonth;
  UTCDayISO = (UTCDay < 10) ? "0" + UTCDay : UTCDay;
  UTCHoursISO = (UTCHours < 10) ? "0" + UTCHours : UTCHours;
  UTCMinutesISO = (UTCMinutes < 10) ? "0" + UTCMinutes : UTCMinutes;
  UTCSecondsISO = (UTCSeconds < 10) ? "0" + UTCSeconds : UTCSeconds;
  
  outputISO.innerHTML += `
    ${UTCYear}-${UTCMonthISO}-${UTCDayISO}T${UTCHoursISO}:${UTCMinutesISO}:${UTCSecondsISO}Z<br/>`;
  // Z =  zero UTC offset, which is also the time zone for Unix timestamps
  outputISO.innerHTML += `${UTCYear}-${UTCMonthISO}-${UTCDayISO}<br/>`;
  outputLocal.innerHTML += jsDate.toLocaleString() + "<br/>" + jsDate.toString() + "<br/>";
}