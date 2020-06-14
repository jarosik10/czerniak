const navigation = document.querySelector('.header__navigation');
const navigationOpenButton = document.querySelector('.navigation__opener');
const menu = document.querySelector('.navigation__list');
let mobileMenuBackdrop;
let mobileMenuCloser;
let isMenuOpened = false;
// let isSrollLocked = false;

const keepFocusInside = (event) => {
  if (event.keyCode === 9) {
    const focusable = navigation.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const focusedIndex = Array.prototype.indexOf.call(focusable, document.activeElement);
    if (!event.shiftKey && focusedIndex === focusable.length - 1) {
      focusable[0].focus();
      event.preventDefault();
    } else if (event.shiftKey && focusedIndex === 0) {
      focusable[focusable.length - 1].focus();
      event.preventDefault();
    }
  }
};

const addScrollLock = () => {
  document.body.classList.add('scroll-lock');
  // isSrollLocked = true;
};

const removeScrollLock = () => {
  document.body.classList.remove('scroll-lock');
  // isSrollLocked = false;
};

const toggleNavigationMenu = () => {
  navigationOpenButton.classList.toggle('navigation__opener--active');
  menu.classList.toggle('navigation__list--active');
  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.classList.toggle('navigation__backdrop--active');
    mobileMenuCloser.classList.toggle('navigation__closer--active');
    if (!isMenuOpened) {
      addScrollLock();
    } else {
      removeScrollLock();
    }
  }
};

const closeNavigationMenu = () => {
  navigationOpenButton.classList.remove('navigation__button--active');
  menu.classList.remove('navigation__list--active');
  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.classList.remove('navigation__backdrop--active');
    mobileMenuCloser.classList.remove('navigation__closer--active');
    removeScrollLock();
  }
};

const manageFocusInsideMenu = () => {
  if (isMenuOpened) {
    navigation.addEventListener('keydown', keepFocusInside);
  } else {
    navigation.removeEventListener('keydown', keepFocusInside);
  }
};

navigationOpenButton.addEventListener('click', () => {
  toggleNavigationMenu();
  isMenuOpened = !isMenuOpened;
  manageFocusInsideMenu();
});

const renderMobileMenuComponents = () => {
  mobileMenuBackdrop = document.querySelector('.navigation__backdrop');
  mobileMenuCloser = document.querySelector('.navigation__closer');
  // Create mobile menu backdrop
  if (!mobileMenuBackdrop) {
    mobileMenuBackdrop = document.createElement('div');
    mobileMenuBackdrop.classList.add('navigation__backdrop');
    if (isMenuOpened) {
      mobileMenuBackdrop.classList.add('navigation__backdrop--active');
    }
    navigation.appendChild(mobileMenuBackdrop);
  }
  // Create mobile menu closer
  if (!mobileMenuCloser) {
    mobileMenuCloser = document.createElement('div');
    mobileMenuCloser.classList.add('navigation__closer', 'pill-link', 'pill-link--dark', 'pill-link--very-big');
    if (isMenuOpened) {
      mobileMenuCloser.classList.add('navigation__closer--active');
    }
    const mobileMenuCloserLink = document.createElement('button');
    mobileMenuCloserLink.classList.add('pill-link__link');
    mobileMenuCloserLink.innerHTML = 'Wróć';
    mobileMenuCloser.appendChild(mobileMenuCloserLink);
    navigation.appendChild(mobileMenuCloser);
    mobileMenuCloser.addEventListener('click', () => {
      closeNavigationMenu();
      isMenuOpened = !isMenuOpened;
      manageFocusInsideMenu();
    });
  }
};

const removeMobileMenuComponents = () => {
  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.remove();
  }
  if (mobileMenuCloser) {
    mobileMenuCloser.remove();
  }
  mobileMenuBackdrop = document.querySelector('.navigation__backdrop');
  mobileMenuCloser = document.querySelector('.navigation__closer');
};

const manageComponents = () => {
  const isBigDeviceSize = matchMedia('(min-width: 991px)').matches;
  if (!isBigDeviceSize) {
    renderMobileMenuComponents();
    if (isMenuOpened) {
      addScrollLock();
    }
  } else {
    removeMobileMenuComponents();
    if (isMenuOpened) {
      removeScrollLock();
    }
  }
};

window.onresize = () => {
  manageComponents();
};

window.onload = () => {
  manageComponents();
};
