'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const datePickerEl = document.querySelector('#datetime-picker');
const buttonStartEl = document.querySelector('[data-start]');

const daysValueEl = document.querySelector('[data-days]');
const hoursValueEl = document.querySelector('[data-hours]');
const minutesValueEl = document.querySelector('[data-minutes]');
const secondsValueEl = document.querySelector('[data-seconds]');

let timerId;
let deadline;
let counter;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: validateDate,
};

buttonStartEl.disabled = true;

const fp = flatpickr('#datetime-picker', options);

buttonStartEl.addEventListener('click', () => {
  if (!validateDate(fp.selectedDates)) return;
  datePickerEl.disabled = true;
  buttonStartEl.disabled = true;
  renderCounter();
  timerId = setInterval(renderCounter, 1000);
});

function validateDate(selectedDates) {
  if (!selectedDates?.length) return;
  deadline = selectedDates[0].getTime();
  if (deadline < Date.now()) {
    Notify.failure('Please choose a date in the future');
    buttonStartEl.disabled = true;
    return false;
  }
  buttonStartEl.disabled = false;
  return true;
}

function renderCounter() {
  counter = deadline - Date.now();
  const { days, hours, minutes, seconds } = convertMs(counter);

  daysValueEl.innerText = addLeadingZero(days);
  hoursValueEl.innerText = addLeadingZero(hours);
  minutesValueEl.innerText = addLeadingZero(minutes);
  secondsValueEl.innerText = addLeadingZero(seconds);

  if (!(days || hours || minutes || seconds)) {
    clearInterval(timerId);
    datePickerEl.disabled = false;
    buttonStartEl.disabled = false;
  }
}

function addLeadingZero(value) {
  if (value < 10) return value.toString().padStart(2, '0');
  return value.toString();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
