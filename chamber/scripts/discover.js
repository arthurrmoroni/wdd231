import { places } from '../data/discover.mjs';

const grid = document.querySelector('#discover-grid');
const dialog = document.querySelector('#place-dialog');

// ---------- Place cards ----------
function createCard(place) {
  const card = document.createElement('section');
  card.id = place.id; // the id is also the card's grid-area name in discover.css
  card.classList.add('card', 'place-card');
  if (place.featured) {
    card.classList.add('featured');
  }

  card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
      <img src="${place.image}" srcset="${place.image} 300w, ${place.imageLarge} 600w"
        sizes="(min-width: 1025px) 280px, (min-width: 641px) 45vw, 100vw"
        alt="${place.alt}" width="300" height="200" loading="lazy">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button type="button">Learn More</button>`;

  card.querySelector('button').addEventListener('click', () => showDetails(place));
  return card;
}

function displayPlaces(list) {
  list.forEach((place) => {
    grid.appendChild(createCard(place));
  });
}

// ---------- "Learn More" dialog ----------
function showDetails(place) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name}, ${place.address}`)}`;

  dialog.innerHTML = `
    <button type="button" class="close-modal" aria-label="Close">&#10005;</button>
    <h2 id="dialog-title">${place.name}</h2>
    <address>${place.address}</address>
    <p>${place.details}</p>
    <p><strong>Tip:</strong> ${place.tip}</p>
    <p><a href="${mapUrl}" target="_blank" rel="noopener">Open in Google Maps</a></p>`;

  dialog.setAttribute('aria-labelledby', 'dialog-title');
  dialog.querySelector('.close-modal').addEventListener('click', () => dialog.close());
  dialog.showModal();
}

// A click on the backdrop (outside the dialog box) closes the dialog
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) {
    return;
  }
  const box = dialog.getBoundingClientRect();
  const clickedOutside = event.clientX < box.left || event.clientX > box.right
    || event.clientY < box.top || event.clientY > box.bottom;
  if (clickedOutside) {
    dialog.close();
  }
});

// ---------- Visit message (localStorage) ----------
const msPerDay = 24 * 60 * 60 * 1000;

function getVisitMessage(lastVisit, now) {
  if (!lastVisit) {
    return 'Welcome! Let us know if you have any questions.';
  }

  const timeBetween = now - lastVisit;
  if (timeBetween < msPerDay) {
    return 'Back so soon! Awesome!';
  }

  const days = Math.floor(timeBetween / msPerDay);
  return `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
}

function displayVisitMessage() {
  const now = Date.now();
  const lastVisit = Number(localStorage.getItem('discoverLastVisit'));

  document.querySelector('#visit-text').textContent = getVisitMessage(lastVisit, now);
  localStorage.setItem('discoverLastVisit', now);
}

document.querySelector('#visit-close').addEventListener('click', () => {
  document.querySelector('#visit-banner').remove();
});

displayPlaces(places);
displayVisitMessage();
