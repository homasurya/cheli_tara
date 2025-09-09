let notes = [];
let shownNotes = [];
let noteIndex = 0;

// Load notes
fetch('notes.json')
  .then(res => res.json())
  .then(data => { notes = data; });

// Surprise button
const surpriseBtn = document.getElementById("surpriseBtn");
const notesContainer = document.getElementById("notesContainer");

surpriseBtn.addEventListener("click", () => {
  if (notes.length === 0) return;

  const note = notes[noteIndex];
  noteIndex = (noteIndex + 1) % notes.length;

  if (!shownNotes.includes(note)) shownNotes.push(note);

  displayNote(note);
  updateSidebar();
});

function displayNote(note) {
  notesContainer.innerHTML = "";
  const noteEl = document.createElement("div");
  noteEl.className = "note";
  noteEl.textContent = note;
  notesContainer.appendChild(noteEl);
}

/* Hamburger & sidebar */
const revisitBtn = document.createElement("div");
revisitBtn.className = "revisit-btn";
for (let i = 0; i < 3; i++) {
  const line = document.createElement("span");
  revisitBtn.appendChild(line);
}
document.body.appendChild(revisitBtn);

const sidebar = document.querySelector(".sidebar");
revisitBtn.addEventListener("click", () => sidebar.classList.toggle("open"));

function updateSidebar() {
  sidebar.innerHTML = "";
  shownNotes.forEach((note) => {
    const noteItem = document.createElement("div");
    noteItem.className = "note-item";
    noteItem.textContent = note;
    noteItem.addEventListener("click", () => {
      displayNote(note);
      sidebar.classList.remove("open");
    });
    sidebar.appendChild(noteItem);
  });
}

/* Stars */
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

/* Butterflies */
const butterfliesContainer = document.querySelector(".butterflies");
const colors = [
  "rgba(255,121,198,0.5)",
  "rgba(139,233,253,0.5)",
  "rgba(80,250,123,0.5)",
  "rgba(241,250,140,0.5)",
  "rgba(255,184,108,0.5)",
  "rgba(189,147,249,0.5)"
];

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

  butterfly.style.transform = `scale(${0.7 + Math.random() * 0.8})`;

  wrapper.appendChild(butterfly);
  butterfliesContainer.appendChild(wrapper);
}

/* Shooting Stars */
function createShootingStar() {
  const shootingStar = document.createElement("div");
  shootingStar.className = "shooting-star";
  shootingStar.style.top = Math.random() * 50 + "vh";
  shootingStar.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(shootingStar);
  setTimeout(() => shootingStar.remove(), 2000);
}
setInterval(() => { if (Math.random() < 0.3) createShootingStar(); }, 10000);
