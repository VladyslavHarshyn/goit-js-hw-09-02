'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputId = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysS = document.querySelector('span[data-days]');
const hoursS = document.querySelector('span[data-hours]');
const minutesS = document.querySelector('span[data-minutes]');
const secondsS = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
    userDate = selectedDates[0];
  },
};

flatpickr(inputId, options);

startButton.addEventListener('click', onClickStartTimer);

let timeId = null;
let userDate = null;

function onClickStartTimer() {
  timeId = setInterval(() => {
    const diff = userDate - new Date();

    if (diff <= 0) {
      clearInterval(timeId);
      return;
    }
    setTimeSpan();
  }, 1000);
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
function pad(value) {
  return String(value).padStart(2, '0');
}

function setTimeSpan() {
  const { days, hours, minutes, seconds } = convertMs(userDate - new Date());

  daysS.textContent = pad(days);
  hoursS.textContent = pad(hours);
  minutesS.textContent = pad(minutes);
  secondsS.textContent = pad(seconds);
}
