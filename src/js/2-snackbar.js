import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elForm = document.querySelector('.form');

elForm.addEventListener('submit', event => {
  event.preventDefault();

  const promise = new Promise((resolve, reject) => {
    const elInpState = event.currentTarget.elements.state;
    const delay = event.currentTarget.elements.delay.value;

    setTimeout(() => {
      if (elInpState.value === 'fulfilled') resolve(delay);
      else reject(delay);
    }, delay);
  });

  promise
    .then(onSuccess => {
      iziToast.success({
        message: `Fulfilled promise in ${onSuccess}ms`,
        position: 'topRight',
      });
    })
    .catch(onError => {
      iziToast.error({
        message: `Rejected promise in ${onError}ms`,
        position: 'topRight',
      });
    });
});
