const display = document.getElementById ('display');
const donationList = document.getElementById ('donationList');
const donorInput = document.getElementById ('donorName');
const totalSummary = document.getElementById ('totalSummary');

let currentInput = '';
const rsPerTree = 50;
let totalDonation = 0;
let totalTrees = 0;
let pastDonations = [];

const plusBtn = document.getElementById ('plus');
const minusBtn = document.getElementById ('minus');

document.querySelectorAll ('.btn[data-value]').forEach (button => {
  button.addEventListener ('click', () => {
    currentInput = currentInput === '0'
      ? button.getAttribute ('data-value')
      : currentInput + button.getAttribute ('data-value');
    display.textContent = currentInput;
  });
});

document.getElementById ('clear').addEventListener ('click', () => {
  currentInput = '';
  display.textContent = 'Enter donation';
});

function setActive (button) {
  plusBtn.classList.remove ('active');
  minusBtn.classList.remove ('active');
  button.classList.add ('active');
}

plusBtn.addEventListener ('click', () => {
  setActive (plusBtn);
});

minusBtn.addEventListener ('click', () => {
  setActive (minusBtn);
  if (pastDonations.length > 0) {
    const last = pastDonations.pop ();
    const match = last.match (/₹(\d+)/);
    if (match) {
      const amount = parseInt (match[1]);
      totalDonation -= amount;
      totalTrees -= Math.floor (amount / rsPerTree);
    }
    updateDonationList ();
    totalSummary.textContent = `Total: ₹${totalDonation} | Trees Planted: ${Math.floor (totalDonation / rsPerTree)} 🌳`;
  }
});

document.getElementById ('donate').addEventListener ('click', () => {
  if (!donorInput.value.trim ()) {
    alert ('Please enter your name before donating.');
    return;
  }
  if (!currentInput) return;

  const amount = parseInt (currentInput);
  const trees = Math.floor (amount / rsPerTree);

  totalDonation += amount;
  totalTrees += trees;

  pastDonations.push (
    `${donorInput.value.trim ()} donated ₹${amount} → ${trees} tree(s)`
  );
  updateDonationList ();

  display.textContent = `₹${amount} donated! 🌳 ${trees} tree(s)`;
  setTimeout (() => {
    display.textContent = 'Enter donation';
  }, 3000);

  totalSummary.textContent = `Total: ₹${totalDonation} | Trees Planted: ${Math.floor (totalDonation / rsPerTree)} 🌳`;

  currentInput = '';
  donorInput.value = '';
  setActive (plusBtn);
});

document.getElementById ('impact').addEventListener ('click', () => {
  display.textContent = `Total: ₹${totalDonation} → ${Math.floor (totalDonation / rsPerTree)} tree(s)`;
  setTimeout (() => {
    display.textContent = 'Enter donation';
  }, 3000);
});

function updateDonationList () {
  donationList.innerHTML = '';
  pastDonations.slice ().reverse ().forEach (entry => {
    const li = document.createElement ('li');
    li.textContent = entry;
    donationList.appendChild (li);
  });
}
