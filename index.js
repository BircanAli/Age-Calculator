const form = document.querySelector("form[name=birthday]");
const dayInput = document.querySelector("input[name=day]");
const monthInput = document.querySelector("input[name=month]");
const yearInput = document.querySelector("input[name=year]");

const dayOutput = document.querySelector("#totalDays");
const monthOutput = document.querySelector("#totalMonths");
const yearOutput = document.querySelector("#totalYears");

const numDays = document.querySelector(".num-days");
const numMonths = document.querySelector(".num-months");
const numYears = document.querySelector(".num-years");
console.log(numYears);
let currentTime = new Date();
let currentDay = currentTime.getDate();
let currentMonth = currentTime.getMonth() + 1;
let currentYear = currentTime.getFullYear();

function leapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

let fullMonth = [
  "31",
  leapYear(currentYear) ? "29" : "28",
  "31",
  "30",
  "31",
  "30",
  "31",
  "31",
  "30",
  "31",
  "30",
  "31",
];

function alertMessage(field, message) {
  field.classList.add("input-alert-active");
  field.previousElementSibling.classList.add("alert-text-active");
  field.nextElementSibling.classList.add("alert-text-active");
  field.nextElementSibling.innerHTML = message;
}

function alertMessages(fields) {
  fields.forEach((field) => {
    field.classList.add("input-alert-active");
    field.previousElementSibling.classList.add("alert-text-active");
    field.nextElementSibling.classList.add("alert-text-active");
    field.nextElementSibling.innerHTML = "The field is required";
  });
}
function resetAlerts(fields) {
  fields.forEach((field) => {
    field.resetAlert(field);
  });
}

function resetAlert(field) {
  field.classList.remove("input-alert-active");
  field.previousElementSibling.classList.remove("alert-text-active");
  field.nextElementSibling.classList.remove("alert-text-active");
  field.nextElementSibling.innerHTML = "";
}

function addEffectToNum(field) {
  field.classList.add("trans");
}
function resetInputs() {
  dayInput.value = null;
  monthInput.value = null;
  yearInput.value = "";
}

function renderDays(dayValue) {
  if (dayValue >= currentDay) {
    numDays.textContent = `${dayValue - currentDay}`;
  } else {
    numDays.textContent = `${Math.abs(dayValue - currentDay)}`;
  }
}

function renderMonthsYears(monthValue, yearValue) {
  if (monthValue < currentMonth) {
    numMonths.textContent = `${Math.abs(monthValue - currentMonth)}`;
    numYears.textContent = `${currentYear - yearValue}`;
  }

  if (monthValue == currentMonth) {
    numMonths.textContent = `${monthValue - currentMonth}`;
    numYears.textContent = `${currentYear - yearValue}`;
  }

  if (monthValue > currentMonth) {
    numMonths.textContent = `${Math.abs(+monthValue - +currentMonth - 12)}`;
    numYears.textContent = `${currentYear - yearValue - 1}`;
  }
}

let isValidate = false;

function validateAge(dayValue, monthValue, yearValue, daysOfSelectedMonth) {
  if (!dayInput.value && !monthInput.value && !yearInput.value) {
    (isValidate = false), alertMessages([dayInput, monthInput, yearInput]);
  } else {
    isValidate = true;
  }

  if (
    !dayInput.value ||
    dayValue <= 0 ||
    dayValue > daysOfSelectedMonth ||
    dayValue >= 32
  ) {
    alertMessage(dayInput, "Must be valid date");
    isValidate = false;
  } else {
    isValidate = true;
  }
  if (!monthInput.value || monthValue <= 0 || monthValue > 12) {
    alertMessage(monthInput, "Must be valid month");
    isValidate = false;
  } else {
    isValidate = true;
  }
  if (!dayInput.value || dayValue > daysOfSelectedMonth) {
    alertMessage(dayInput, "Must be valid date");
    isValidate = false;
  } else {
    isValidate = true;
  }

  if (!yearInput.value || yearValue < 1900 || yearValue > currentYear) {
    alertMessage(yearInput, "Must be valid year");
    isValidate = false;
  }

  return isValidate;
}

dayInput.addEventListener("input", function () {
  resetAlert(dayInput);
});

monthInput.addEventListener("input", function () {
  resetAlert(monthInput);
});

yearInput.addEventListener("input", function () {
  resetAlert(yearInput);
});

function calculateAge() {
  let dayValue = dayInput.value;
  let monthValue = monthInput.value;
  let yearValue = yearInput.value;

  let daysOfSelectedMonth = +fullMonth[monthValue - 1];
  validateAge(dayValue, monthValue, yearValue, daysOfSelectedMonth);

  if (isValidate) {
    renderDays(dayValue);
    renderMonthsYears(monthValue, yearValue);

    resetAlert(dayInput, monthInput, yearInput);
    resetInputs();

    addEffectToNum(numDays);
    addEffectToNum(numMonths);
    addEffectToNum(numYears);
    isValidate = true;
  }
}
