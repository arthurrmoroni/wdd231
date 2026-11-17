// Read the form data from the URL query string
const params = new URLSearchParams(window.location.search);

// Format the hidden timestamp for display
function formatTimestamp(value) {
  const date = new Date(value);
  if (!value || isNaN(date)) {
    return '—';
  }
  return date.toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' });
}

// Required fields: [label, value]
const fields = [
  ['First Name', params.get('first')],
  ['Last Name', params.get('last')],
  ['Email', params.get('email')],
  ['Mobile Phone', params.get('phone')],
  ['Business Name', params.get('business')],
  ['Submitted', formatTimestamp(params.get('timestamp'))]
];

const results = document.querySelector('#results');

fields.forEach(([label, value]) => {
  const dt = document.createElement('dt');
  dt.textContent = label;

  const dd = document.createElement('dd');
  dd.textContent = value || '—'; // textContent: never runs markup from the URL

  results.append(dt, dd);
});
