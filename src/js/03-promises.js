'use strict';

import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const formEl = document.querySelector('.form');
const delayEl = formEl.elements.delay;
const stepEl = formEl.elements.step;
const amountEl = formEl.elements.amount;
const btnSubmitEl = formEl.querySelector('button');

btnSubmitEl.addEventListener('click', evt => {
  evt.preventDefault();
  let delay = +delayEl.value;
  const step = +stepEl.value;
  const amount = +amountEl.value;

  for (let i = 1; i <= amount; i++) {
    setTimeout(
      delay => {
        createPromise(i, delay)
          .then(msgFullfilled => {
            Notify.success(msgFullfilled);
          })
          .catch(msgRejected => {
            Notify.failure(msgRejected);
          });
      },
      delay,
      delay
    );
    delay += step;
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return Promise.resolve(`✅ Fulfilled promise ${position} in ${delay} ms`);
  } else {
    return Promise.reject(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}
