let notes = [];
let shownNotes = []; // stores notes that have been displayed

// Load notes from JSON
fetch('notes.json')
  .then(response => response.json())
  .then(data => { notes = data; });

// Surprise button
document.getElementById("surpriseBtn").addEventListener("click", () => {
  if (notes.length === 0) return;

  let index = Math.floor(Math.random() * notes.length);
  const note = notes[index];

  if (!shownNotes.includes(note)) shownNotes.push(note);

  const notesContainer = document.getElementById("notesContainer");
  notesContainer.innerHTML = ""; // show only one note
  const noteEl = document.createElement("div");
  noteEl.className = "note";
  noteEl.textContent = note;
  notesContainer.appendChild(noteEl);
});

/* Hamburger-style revisit button */
const revisitBtn = document.createElement("div");
revisitBtn.className = "revisit-btn";
for (let i = 0; i < 3; i++) {
  const line = document.createElement("span");
  revisitBtn.appendChild(line);
}
document.body.appendChild(revisitBtn);

revisitBtn.addEventListener("click", () => {
  const notesContainer = document.getElementById("notesContainer");
  notesContainer.innerHTML = "";

  shownNotes.forEach(note => {
    const noteEl = document.createElement("div");
    noteEl.className = "note";
    noteEl.textContent = note;
    notesContainer.appendChild(noteEl);
  });
});

/* --- Stars --- */
const starsContainer = document.querySelector(".stars");
for (let i = 0; i < 150; i++) {
  const star = document.createElement("div");
  star.className = "star";
  star.style.top = Math.random() * 100 + "vh";
  star.style.left = Math.random() * 100 + "vw";
  const size = Math.random() * 3 + 1;
  star.style.width = size + "px";
  star.style.height = size + "px";
  star.style.opacity = (0.5 + Math.random() * 0.5).toString();
  star.style.animationDuration = (2 + Math.random() * 4) + "s";
  starsContainer.appendChild(star);
}

/* --- Butterflies --- */
const butterfliesContainer = document.querySelector(".butterflies");
const colors = ["#ff79c6", "#8be9fd", "#50fa7b", "#f1fa8c", "#ffb86c", "#bd93f9"];

for (let i = 0; i < 12; i++) {
  const wrapper = document.createElement("div");
  wrapper.className = "butterfly-wrapper";
  wrapper.style.left = Math.random() * 100 + "vw";
  wrapper.style.top = "110vh";

  const butterfly = document.createElement("div");
  butterfly.className = "butterfly";
  butterfly.textContent = "🦋";
  butterfly.style.color = colors[Math.floor(Math.random() * colors.length)];

  const flyDuration = 15 + Math.random() * 10;
  const swayDuration = 3 + Math.random() * 2;
  wrapper.style.animationDuration = `${flyDuration}s`;
  wrapper.style.animationDelay = `${Math.random() * 5}s`;
  butterfly.style.animationDuration = `${swayDuration}s`;
  butterfly.style.animationDelay = `${Math.random() * 2}s`;

  butterfly.style.transform = `scale(${0.8 + Math.random() * 1.5})`;

  wrapper.appendChild(butterfly);
  butterfliesContainer.appendChild(wrapper);
}

/* --- Shooting Stars Occasionally --- */
function createShootingStar() {
  const shootingStar = document.createElement("div");
  shootingStar.className = "shooting-star";
  shootingStar.style.top = Math.random() * 50 + "vh";
  shootingStar.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(shootingStar);
  setTimeout(() => shootingStar.remove(), 2000);
}
setInterval(() => { if (Math.random() < 0.3) createShootingStar(); }, 10000);
