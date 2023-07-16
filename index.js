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

function alertMessage(field) {
  field.classList.add("input-alert-active");
  field.previousElementSibling.classList.add("alert-text-active");
  field.nextElementSibling.classList.add("alert-text-active");
  field.nextElementSibling.innerHTML = "please enter valid day";
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
  yearInput.value = null;
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

function validateAge(dayValue, monthValue, yearValue, daysOfSelectedMonth) {
  if (!dayInput.value || dayValue <= 0 || dayValue > daysOfSelectedMonth) {
    // dayInput.classList.add("input-alert-active");
    // dayInput.previousElementSibling.classList.add("alert-text-active");
    // dayInput.nextElementSibling.classList.add("alert-text-active");
    // dayInput.nextElementSibling.innerHTML = "please enter valid day";
    alertMessage(dayInput);
    isValidate = false;

    if (!monthInput.value || monthValue <= 0 || monthValue > 12) {
      // monthInput.classList.add("input-alert-active");
      // monthInput.previousElementSibling.classList.add("alert-text-active");
      // monthInput.nextElementSibling.classList.add("alert-text-active");
      // monthInput.nextElementSibling.innerHTML = "please enter valid month";
      alertMessage(monthInput);
      isValidate = false;

      if (!yearValue || yearValue < 1900 || yearValue > currentYear) {
        alertMessage(yearInput);
        isValidate = false;
      }
    }
  } else return (isValidate = true);
  // isValidate = !isValidate;
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
    resetInputs();
  }
}
