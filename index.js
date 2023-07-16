const form = document.querySelector("form[name=birthday]");
const dayInput = document.querySelector("input[name=day]");
const monthInput = document.querySelector("input[name=month]");
const yearInput = document.querySelector("input[name=year]");

const dayOutput = document.querySelector("#totalDays");
const monthOutput = document.querySelector("#totalMonths");
const yearOutput = document.querySelector("#totalYears");

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

function resetInputs() {
  dayInput.value = null;
  monthInput.value = null;
  yearInput.value = "";
}

function renderDays(dayValue) {
  if (dayValue >= currentDay) {
    dayOutput.innerHTML = `<h1>${dayValue - currentDay} Days</h1>`;
  } else {
    dayOutput.innerHTML = `<h1>${Math.abs(dayValue - currentDay)} Days</h1>`;
  }
}

function renderMonthsYears(monthValue, yearValue) {
  if (monthValue < currentMonth) {
    monthOutput.innerHTML = `<h1>${Math.abs(
      monthValue - currentMonth
    )} Months</h1>`;
    yearOutput.innerHTML = `<h1>${currentYear - yearValue} Years</h1>`;
  }

  if (monthValue == currentMonth) {
    monthOutput.innerHTML = `<h1>${monthValue - currentMonth} Months</h1>`;
    yearOutput.innerHTML = `<h1>${currentYear - yearValue} Years</h1>`;
  }

  if (monthValue > currentMonth) {
    monthOutput.innerHTML = `<h1>${Math.abs(
      +monthValue - +currentMonth - 12
    )} Months</h1>`;
    yearOutput.innerHTML = `<h1>${currentYear - yearValue - 1} Years</h1>`;
  }
}

let isValidate = false;
console.log(isValidate);
function validateAge(dayValue, monthValue, yearValue, daysOfSelectedMonth) {
  if (!dayInput.value && !monthInput.value && !yearInput.value) {
    (isValidate = false), alertMessages([dayInput, monthInput, yearInput]);
  } else {
    isValidate = true;
  }
  console.log(isValidate); //false

  if (
    !dayInput.value ||
    dayValue <= 0 ||
    dayValue > daysOfSelectedMonth ||
    dayValue >= 32
  ) {
    alertMessage(dayInput, "Must be valid date");
    isValidate = false;
    console.log(isValidate); //false
  } else {
    isValidate = true;
  }
  if (!monthInput.value || monthValue <= 0 || monthValue > 12) {
    alertMessage(monthInput, "Must be valid year");
    isValidate = false;
    console.log(isValidate);
  } else {
    isValidate = true;
  }
  if (!dayInput.value || dayValue > daysOfSelectedMonth) {
    alertMessage(dayInput, "Must be valid date");
    isValidate = false;
    console.log(isValidate); // false
  } else {
    isValidate = true;
  }
  console.log(isValidate);
  if (!yearInput.value || yearValue < 1900 || yearValue > currentYear) {
    alertMessage(yearInput, "Must be valid year");
    isValidate = false;
    console.log(isValidate); //
  }

  console.log(isValidate); // false
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

  console.log(isValidate); // false
  if (isValidate) {
    console.log(isValidate);
    renderDays(dayValue);
    renderMonthsYears(monthValue, yearValue);
    resetAlert(dayInput, monthInput, yearInput);
    resetInputs();
    isValidate = true;
  }
}
