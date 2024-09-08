// Get elements
const form = document.getElementById('form');
const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');
const outputDays = document.getElementById('days');
const outputMonths = document.getElementById('months');
const outputYears = document.getElementById('years');

// Get current date
const TODAY = new Date();

// Error msgs
const errorMessages = {
  required: 'This field is required',
  invalid: (str) => `Must be a valid ${str}`,
  range: 'Must be in the past',
};

// Set current year as max year
inputYear.setAttribute('max', TODAY.getFullYear());

const validateForm = (e) => {
  e.preventDefault();
  const [dd, mm, yyyy] = [inputDay.value, inputMonth.value, inputYear.value];

  // Set max days in selected month
  const daysInMonth = new Date(yyyy, mm, 0).getDate();
  inputDay.setAttribute('max', daysInMonth);

  // Check if input is a future date
  const isFuture = TODAY.getTime() < new Date(yyyy, mm - 1, dd).getTime();

  // Validate year
  if (inputYear.validity.valueMissing) {
    inputYear.setCustomValidity(errorMessages.required);
  } else if (inputYear.validity.rangeUnderflow) {
    inputYear.setCustomValidity(errorMessages.invalid('year'));
  } else if (inputYear.validity.rangeOverflow || isFuture) {
    inputYear.setCustomValidity(errorMessages.range);
  } else {
    inputYear.setCustomValidity('');
  }
  inputYear.nextElementSibling.textContent = inputYear.validationMessage;

  // Validate month
  if (inputMonth.validity.valueMissing) {
    inputMonth.setCustomValidity(errorMessages.required);
  } else if (
    inputMonth.validity.rangeUnderflow ||
    inputMonth.validity.rangeOverflow
  ) {
    inputMonth.setCustomValidity(errorMessages.invalid('month'));
  } else {
    inputMonth.setCustomValidity('');
  }
  inputMonth.nextElementSibling.textContent = inputMonth.validationMessage;

  // Validate day
  if (inputDay.validity.valueMissing) {
    inputDay.setCustomValidity(errorMessages.required);
  } else if (
    inputYear.checkValidity() &&
    inputMonth.checkValidity() &&
    inputDay.validity.rangeOverflow
  ) {
    inputDay.setCustomValidity(errorMessages.invalid('date'));
  } else if (
    inputDay.validity.rangeUnderflow ||
    inputDay.validity.rangeOverflow
  ) {
    inputDay.setCustomValidity(errorMessages.invalid('day'));
  } else {
    inputDay.setCustomValidity('');
  }
  inputDay.nextElementSibling.textContent = inputDay.validationMessage;

  // if all is ok calculate the age else reset results
  if (
    inputDay.checkValidity() &&
    inputMonth.checkValidity() &&
    inputYear.checkValidity()
  ) {
    calculateAge(dd, mm, yyyy);
  } else {
    // Reset the results
    outputDays.textContent =
      outputMonths.textContent =
      outputYears.textContent =
        '- -';
  }
};

const calculateAge = (day, month, year) => {
  const birthDate = new Date(year, month - 1, day);

  let years = TODAY.getFullYear() - birthDate.getFullYear();
  let months = TODAY.getMonth() - birthDate.getMonth();
  let days = TODAY.getDate() - birthDate.getDate();

  /// If the birth date month is later than today's date month, adjust the years and months
  if (months < 0 || (months == 0 && days < 0)) {
    years--;
    months += 12;
  }

  // If the birth date day is later than today's date day, adjust the days and months
  if (days < 0) {
    const daysInLastMonth = new Date(
      TODAY.getFullYear(),
      TODAY.getMonth(),
      0
    ).getDate();
    days += daysInLastMonth;
    months--;
  }

  animateNumber(outputYears, years);
  animateNumber(outputMonths, months);
  animateNumber(outputDays, days);
};

// Animate nunbers
const animateNumber = (el, num) => {
  let count = 0;
  el.textContent = count;

  const interval = 2000 / num;

  const update = () => {
    count++;
    if (count < num) {
      el.textContent = count;
      setTimeout(update, interval);
    } else {
      el.textContent = num;
    }
  };

  update();
};

form.addEventListener('submit', validateForm);
