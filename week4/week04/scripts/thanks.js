// 1. Read the query string (?first=...&last=...) from the URL
const params = new URLSearchParams(window.location.search);

// 2. Fields to show: [name attribute in the form, label to display]
const fields = [
  ['first', 'First Name'],
  ['last', 'Last Name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['date', 'Preferred Date'],
  ['service', 'Service'],
  ['contact', 'Contact Preference'],
  ['notes', 'Notes'],
  ['newsletter', 'Newsletter']
];

const results = document.querySelector('#results');

// 3. Read each value with .get() and display it with textContent (safe)
fields.forEach(([name, label]) => {
  const p = document.createElement('p');
  const strong = document.createElement('strong');
  strong.textContent = `${label}: `;
  p.appendChild(strong);
  p.append(params.get(name) || (name === 'newsletter' ? 'No' : '—'));
  results.appendChild(p);
});
