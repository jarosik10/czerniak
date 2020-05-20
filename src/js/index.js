const loginInputs = document.querySelectorAll('.field__input');

loginInputs.forEach((input) => {
  input.addEventListener('focus', () => {
    input.parentNode.classList.add('field--active');
  });
  input.addEventListener('blur', () => {
    input.parentNode.classList.remove('field--active');
    if (input.value) {
      input.parentNode.classList.add('field--filled');
    } else {
      input.parentNode.classList.remove('field--filled');
    }
  });
});
