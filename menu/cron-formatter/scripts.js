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
    description += `at minute ${minute}`;
  }

  // Parse the hour field
  if (hour === '*') {
    description += ', every hour';
  } else {
    description += `, at ${hour === '0' ? 'midnight' : hour}`;
  }

  // Parse the day of month field
  if (dayOfMonth === '*') {
    description += ', Every day';
  } else if (dayOfMonth.includes('-')) {
    description += `, from the ${getOrdinalNumber(dayOfMonth.split('-')[0], false)} to the ${getOrdinalNumber(dayOfMonth.split('-')[1], false)} day of the month`;
  } else {
    description += `, on the ${getOrdinalNumber(dayOfMonth)}`;
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
    description += `, on ${parseDayOfWeek(dayOfWeek)}`;
  }

  return description;
}

function parseDayOfWeek(dayOfWeek) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeekList = dayOfWeek.split(',');
  let dayOfWeekDescList = [];
  for (let i = 0; i < dayOfWeekList.length; i++) {
    let desc = '';
    const value = dayOfWeekList[i];
    if (value.includes('-')) {
      const [start, end] = value.split('-');
      desc = `${getDayOfWeekName(start)}-${getDayOfWeekName(end)}`;
    } else {
      desc = `${getDayOfWeekName(value)}`;
    }
    dayOfWeekDescList.push(desc);
  }
  return dayOfWeekDescList.join(', ');
}

//  need to figureout how to concat correct suffix
function getOrdinalNumber(input, includeSuffix = true) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const numbers = input.split(' ');

  const result = [];
  for (const number of numbers) {
    const lastTwoDigits = Number(number.toString().slice(-2));
    const suffix = includeSuffix ? suffixes[(lastTwoDigits > 10 && lastTwoDigits < 14) ? 0 : (lastTwoDigits % 10)] : '';
    result.push(number + suffix);
  }

  return result.join(' ');
}

function getMonthName(month) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const range = month.split('-');
  if (range.length === 2) {
    return `${months[range[0] - 1]} to ${months[range[1] - 1]}`;
  } else {
    return months[Number(month) - 1];
  }
}

function getDayOfWeekName(dayOfWeek) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const range = dayOfWeek.split('-');
  if (range.length === 2) {
    return `${daysOfWeek[range[0] - 1]} to ${daysOfWeek[range[1] - 1]}`;
  } else {
    return daysOfWeek[range[0] - 1];
  }
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