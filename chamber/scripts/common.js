// Responsive navigation (hamburger menu)
const menuButton = document.querySelector('#menu');
const primaryNav = document.querySelector('#primary-nav');

menuButton.addEventListener('click', () => {
  primaryNav.classList.toggle('open');
  menuButton.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', primaryNav.classList.contains('open'));
});

// Footer dates
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = document.lastModified;
