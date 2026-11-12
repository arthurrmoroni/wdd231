const url = 'data/members.json';
const membersContainer = document.querySelector('#members');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');

const levels = { 1: 'Member', 2: 'Silver Member', 3: 'Gold Member' };

async function getMembers() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error(error);
    membersContainer.innerHTML = '<p>Sorry, the member directory could not be loaded.</p>';
  }
}

const displayMembers = (members) => {
  membersContainer.innerHTML = '';

  members.forEach((member) => {
    const card = document.createElement('section');
    card.classList.add('member-card');

    const logo = document.createElement('img');
    logo.setAttribute('src', `images/${member.image}`);
    logo.setAttribute('alt', `${member.name} logo`);
    logo.setAttribute('loading', 'lazy');
    logo.setAttribute('width', '400');
    logo.setAttribute('height', '300');

    const name = document.createElement('h2');
    name.textContent = member.name;

    const level = document.createElement('p');
    level.classList.add('level', `level-${member.membershipLevel}`);
    level.textContent = levels[member.membershipLevel];

    const industry = document.createElement('p');
    industry.classList.add('industry');
    industry.textContent = member.industry;

    const address = document.createElement('p');
    address.textContent = member.address;

    const phone = document.createElement('p');
    phone.textContent = member.phone;

    const website = document.createElement('a');
    website.setAttribute('href', member.website);
    website.setAttribute('target', '_blank');
    website.setAttribute('rel', 'noopener');
    website.textContent = member.website.replace('https://', '');

    card.append(logo, name, level, industry, address, phone, website);
    membersContainer.appendChild(card);
  });
};

const setView = (view) => {
  const isGrid = view === 'grid';
  membersContainer.classList.toggle('grid', isGrid);
  membersContainer.classList.toggle('list', !isGrid);
  gridBtn.classList.toggle('active', isGrid);
  listBtn.classList.toggle('active', !isGrid);
  gridBtn.setAttribute('aria-pressed', isGrid);
  listBtn.setAttribute('aria-pressed', !isGrid);
};

gridBtn.addEventListener('click', () => setView('grid'));
listBtn.addEventListener('click', () => setView('list'));

getMembers();
