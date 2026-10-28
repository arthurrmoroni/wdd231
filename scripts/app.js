const navButton = document.querySelector('#nav-button');

navButton.addEventListener('click', () => {
  const isOpen = navButton.classList.toggle('show');
  navButton.setAttribute('aria-expanded', isOpen);
});