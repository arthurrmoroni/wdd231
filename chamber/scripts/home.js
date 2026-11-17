// ---------- Weather (OpenWeatherMap) ----------
const apiKey = '6f9b5cd69243a5d0b3e3c1c1383b4455';
const lat = 41.15;
const lon = -8.61;

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const currentTemp = document.querySelector('#current-temp');
const weatherDesc = document.querySelector('#weather-desc');
const weatherIcon = document.querySelector('#weather-icon');
const forecastList = document.querySelector('#forecast');

async function getCurrentWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      displayCurrentWeather(data);
    } else {
      weatherDesc.textContent = 'Weather data is currently unavailable.';
    }
  } catch (error) {
    weatherDesc.textContent = 'Weather data is currently unavailable.';
  }
}

function displayCurrentWeather(data) {
  const desc = data.weather[0].description;
  currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
  weatherDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);

  const icon = document.createElement('img');
  icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`);
  icon.setAttribute('alt', desc);
  icon.setAttribute('width', '100');
  icon.setAttribute('height', '100');
  weatherIcon.appendChild(icon);
}

async function getForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (response.ok) {
      const data = await response.json();
      displayForecast(data.list);
    } else {
      forecastList.innerHTML = '<li>Forecast is currently unavailable.</li>';
    }
  } catch (error) {
    forecastList.innerHTML = '<li>Forecast is currently unavailable.</li>';
  }
}

// The forecast API returns data every 3 hours, so the entries are grouped
// by date and the highest temperature of each day is kept.
function displayForecast(list) {
  const days = {};

  list.forEach((item) => {
    const date = item.dt_txt.slice(0, 10);
    days[date] = Math.max(days[date] ?? -Infinity, item.main.temp_max);
  });

  const today = new Date().toISOString().slice(0, 10);
  forecastList.innerHTML = '';

  Object.keys(days).slice(0, 3).forEach((date) => {
    const label = date === today
      ? 'Today'
      : new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'long' });

    const li = document.createElement('li');
    li.innerHTML = `<span>${label}</span> <strong>${Math.round(days[date])}&deg;C</strong>`;
    forecastList.appendChild(li);
  });
}

// ---------- Member spotlights ----------
const membersUrl = 'data/members.json';
const spotlightContainer = document.querySelector('#spotlight-cards');
const levels = { 2: 'Silver Member', 3: 'Gold Member' };

// Fisher–Yates shuffle for a fair random order on every page load
function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

async function getSpotlights() {
  try {
    const response = await fetch(membersUrl);
    if (response.ok) {
      const data = await response.json();
      const goldAndSilver = data.members.filter((member) => member.membershipLevel === 2 || member.membershipLevel === 3);
      displaySpotlights(shuffle(goldAndSilver).slice(0, 3));
    } else {
      spotlightContainer.innerHTML = '<p>Member spotlights could not be loaded.</p>';
    }
  } catch (error) {
    spotlightContainer.innerHTML = '<p>Member spotlights could not be loaded.</p>';
  }
}

function displaySpotlights(members) {
  spotlightContainer.innerHTML = '';

  members.forEach((member) => {
    const card = document.createElement('section');
    card.classList.add('spotlight');

    card.innerHTML = `
      <h3>${member.name}</h3>
      <div class="spotlight-body">
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="400" height="300">
        <div>
          <p class="level level-${member.membershipLevel}">${levels[member.membershipLevel]}</p>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace('https://', '')}</a>
        </div>
      </div>
    `;

    spotlightContainer.appendChild(card);
  });
}

getCurrentWeather();
getForecast();
getSpotlights();
