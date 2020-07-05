/* eslint-disable no-unused-expressions */
/* eslint-disable object-curly-newline */
const btn = document.querySelector('.sub-btn');
btn?.addEventListener('click', async (event) => {
  event.preventDefault();
  const name = document.querySelector('.input-name').value;
  const email = document.querySelector('.input-email').value;
  const phone = document.querySelector('.input-phone').value;
  const summ = document.querySelector('.input-summ').value;
  const delivery = document.querySelector('input[type = radio]:checked').id;
  const response = await fetch('order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, summ, delivery }),
  });
  const result = await response.json();
  if (result.message === 'ok') {
    window.location.reload();
  }
});
