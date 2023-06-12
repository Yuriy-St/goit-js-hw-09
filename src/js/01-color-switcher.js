'use strict';

const bodyEl = document.body;
const buttonStartEl = document.querySelector('[data-start]');
const buttonStopEl = document.querySelector('[data-stop]');
let timerId;

buttonStartEl.addEventListener('click', () => {
	buttonStartEl.disabled = true;
	changeColor();
	timerId = setInterval(changeColor, 1000);
})

buttonStopEl.addEventListener('click', () => {
	buttonStartEl.disabled = false;
	clearInterval(timerId);
})

function changeColor() {
	const currentColor = getRandomHexColor();
	bodyEl.style.backgroundColor = currentColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
