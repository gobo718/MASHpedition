const makeSlot = (number) => {
  const button = document.createElement('button');
  button.className = 'art-slot';
  button.type = 'button';
  button.dataset.destination = `Atelier artwork ${number}`;
  button.innerHTML = `<span class="slot-inner">ARTWORK</span><span class="slot-number">${number}</span>`;
  return button;
};

const upper = document.getElementById('upper-four');
const lower = document.getElementById('lower-four');

for (let i = 1; i <= 4; i += 1) upper.appendChild(makeSlot(i));
for (let i = 5; i <= 8; i += 1) lower.appendChild(makeSlot(i));

const dialog = document.getElementById('placeholder-dialog');
const dialogTitle = document.getElementById('dialog-title');

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-destination]');
  if (!target) return;
  dialogTitle.textContent = target.dataset.destination;
  if (typeof dialog.showModal === 'function') dialog.showModal();
});
