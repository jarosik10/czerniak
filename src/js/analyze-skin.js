const addFileButton = document.querySelector('.file-field__button');
const addFileInput = document.querySelector('.file-field__input');
const form = document.querySelector('.form');

let currentfile;

const fileTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/raw',
];

const validFileType = (file) => fileTypes.includes(file.type);

addFileButton.addEventListener('click', (event) => {
  event.preventDefault();
  addFileInput.click();
});

addFileInput.addEventListener('change', () => {
  [currentfile] = addFileInput.files;
  if (validFileType(currentfile)) {
    form.submit();
    // document.cookie = 'waitingForResult=true';
  }
});

// const createSpinner = () => {
//   const spinner = document.createElement('div');
//   spinner.className =
// }

// const manageComponents = () => {

// };
