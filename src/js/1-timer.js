import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elBtnDataStart = document.querySelector('[data-start]');
const elInputDateTime = document.querySelector('#datetime-picker');
const elData = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
elBtnDataStart.disabled = true;
elBtnDataStart.style.cursor = 'not-allowed';

flatpickr(elInputDateTime, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const currentDate = new Date();

    if (userSelectedDate.getTime() < currentDate.getTime()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      elBtnDataStart.disabled = true;
    } else {
      elBtnDataStart.disabled = false;
      elBtnDataStart.style.cursor = 'pointer';
    }
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

elBtnDataStart.addEventListener('click', () => {
  elInputDateTime.disabled = true;
  elInputDateTime.style.cursor = 'not-allowed';
  elBtnDataStart.style.cursor = 'not-allowed';

  const intervalId = setInterval(() => {
    const currentDate = new Date();
    const subtTime = userSelectedDate.getTime() - currentDate.getTime();

    const { days, hours, minutes, seconds } = elData;
    const objSubtTime = convertMs(subtTime);

    if (objSubtTime.seconds < 0) {
      clearInterval(intervalId);
      elInputDateTime.disabled = false;
      elBtnDataStart.disabled = true;
      elInputDateTime.style.cursor = 'pointer';
      return;
    }

    days.textContent = addZero(objSubtTime.days);
    hours.textContent = addZero(objSubtTime.hours);
    minutes.textContent = addZero(objSubtTime.minutes);
    seconds.textContent = addZero(objSubtTime.seconds);
  }, 1000);
});

function addZero(value) {
  return String(value).padStart(2, '0');
}
