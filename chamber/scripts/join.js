// Hidden timestamp: date and time the form was loaded
document.querySelector('#timestamp').value = new Date().toISOString();

// Membership level modals
const modalLinks = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.level-modal');

modalLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector(`#${link.dataset.modal}`).showModal();
  });
});

modals.forEach(modal => {
  // Close button
  modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.close();
  });

  // Click outside the modal (on the backdrop) closes it
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
});
