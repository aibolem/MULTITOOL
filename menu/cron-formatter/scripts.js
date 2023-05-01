"use strict";
function getCronDescription(cronExpression) {
  const fields = cronExpression.split(' ');
  const minute = fields[0];
  const hour = fields[1];
  const dayOfMonth = fields[2];
  const month = fields[3];
  const dayOfWeek = fields[4];
  let description = '';

  // Parse the minute field
  if (minute === '*') {
    description += 'every minute';
  } else {
    description += `At minute ${minute}`;
  }

  // Parse the hour field
  if (hour === '*') {
    description += ', every hour';
  } else {
    description += `, at ${hour === '0' ? 'midnight' : hour}`;
  }

  // Parse the day of month field
  if (dayOfMonth === '*') {
    description += ', every day';
  } else {
    description += `, on the ${getOrdinalNumber(dayOfMonth)} day of the month`;
  }

  // Parse the month field
  if (month === '*') {
    description += ', every month';
  } else {
    description += `, in ${getMonthName(month)}`;
  }

  // Parse the day of week field
  if (dayOfWeek === '*') {
    description += ', every day of the week';
  } else {
    description += `, on ${getDayOfWeekName(dayOfWeek)}`;
  }

  return description;
}

function getOrdinalNumber(number) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const lastTwoDigits = Number(number.toString().slice(-2));
  const suffix = suffixes[(lastTwoDigits > 10 && lastTwoDigits < 14) ? 0 : (lastTwoDigits % 10)];
  return number + suffix;
}

function getMonthName(month) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[Number(month) - 1];
}

function getDayOfWeekName(dayOfWeek) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return daysOfWeek[Number(dayOfWeek) - 1];
}


function parseCronExpression(cronExpression) {
  const fields = cronExpression.split(' ');

  return {
    minute: fields[0],
    hour: fields[1],
    dayOfMonth: fields[2],
    month: fields[3],
    dayOfWeek: fields[4],
  };
}
const cronExpressionInput = document.getElementById('cron-expression');
const minuteInput = document.getElementById('minute');
const hourInput = document.getElementById('hour');
const dayOfMonthInput = document.getElementById('day-of-month');
const monthInput = document.getElementById('month');
const dayOfWeekInput = document.getElementById('day-of-week');
const descriptionOfCron = document.getElementById('description');
const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', () => {
  const cronExpression = cronExpressionInput.value;
  const description = getCronDescription(cronExpression);
  const parsedCron = parseCronExpression(cronExpression);

  // minuteInput.value = parsedCron.minute;
  // hourInput.value = parsedCron.hour;
  // dayOfMonthInput.value = parsedCron.dayOfMonth;
  // monthInput.value = parsedCron.month;
  // dayOfWeekInput.value = parsedCron.dayOfWeek;
  descriptionOfCron.textContent = description;

});