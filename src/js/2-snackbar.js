import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elForm = document.querySelector('.form');

elForm.addEventListener('submit', event => {
  event.preventDefault();
  const elInpNumber = event.currentTarget.elements.delay;
  const elInpState = event.currentTarget.elements.state;

  const promise = new Promise((resolve, reject) => {
    if (elInpState.value === 'fulfilled') resolve(elInpNumber.value);
    else reject(elInpNumber.value);
  });

  elInpNumber.value = '';
  elInpState.forEach(el => (el.checked ? (el.checked = false) : undefined));

  promise
    .then(onSuccess => {
      setTimeout(() => {
        iziToast.success({
          message: `Fulfilled promise in ${onSuccess}ms`,
          position: 'topRight',
        });
        console.log();
      }, onSuccess);
    })
    .catch(onError => {
      setTimeout(() => {
        iziToast.error({
          message: `Rejected promise in ${onError}ms`,
          position: 'topRight',
        });
      }, onError);
    });
});
