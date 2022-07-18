'use strict';

const ble = {
  form: document.querySelector('.form'),
};

ble.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const formsEl = event.currentTarget.elements;

  let amount = Number(formsEl.amount.value);
  let delay = Number(formsEl.delay.value);
  let step = Number(formsEl.step.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setInterval(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // Fulfill
      } else {
        reject({ position, delay }); // Reject
      }
    }, delay);
  });
}
