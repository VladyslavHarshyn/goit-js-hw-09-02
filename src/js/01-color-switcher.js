'use strict';

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let intervalId = null;
stopButton.disabled = true;

startButton.addEventListener('click', () => {
  startButton.disabled = true;

  stopButton.disabled = false;

  intervalId = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopButton.addEventListener('click', () => {
  startButton.disabled = false;
  stopButton.disabled = true;

  clearInterval(intervalId);
  body.style.backgroundColor = 'white';
});
