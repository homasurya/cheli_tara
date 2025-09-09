let notes = [];
let shownNotes = [];
let noteIndex = 0;

// Fetch notes from JSON
fetch('notes.json')
  .then(res => res.json())
  .then(data => { notes = data; });

const surpriseBtn = document.getElementById("surpriseBtn");
const notesContainer = document.getElementById("notesContainer");

// Show next note
surpriseBtn.addEventListener("click", () => {
  if (notes.length === 0) return;
  const note = notes[noteIndex];
  noteIndex = (noteIndex + 1) % notes.length;
  if (!shownNotes.includes(note)) shownNotes.push(note);
  displayNote(note);
  updateSidebar();
});

// Display a note
function displayNote(note) {
  notesContainer.innerHTML = "";
  const noteEl = document.createElement("div");
  noteEl.className = "note";
  noteEl.textContent = note;
  notesContainer.appendChild(noteEl);
}

// Hamburger / sidebar setup
const revisitBtn = document.createElement("div");
revisitBtn.className = "revisit-btn";
for (let i = 0; i < 3; i++) {
  const line = document.createElement("span");
  revisitBtn.appendChild(line);
}
document.body.appendChild(revisitBtn);

const sidebar = document.querySelector(".sidebar");
revisitBtn.addEventListener("click", () => sidebar.classList.toggle("open"));

// Update sidebar with previews
function updateSidebar() {
  sidebar.innerHTML = "";
  shownNotes.forEach((note) => {
    const noteItem = document.createElement("div");
    noteItem.className = "note-item";
    const preview = note.length > 80 ? note.substring(0, 80) + "…" : note;
    noteItem.textContent = preview;
    noteItem.addEventListener("click", () => {
      displayNote(note);
      sidebar.classList.remove("open");
    });
    sidebar.appendChild(noteItem);
  });
}

/* Responsive Scene Setup */
function setupScene() {
  document.querySelectorAll('.star').forEach(s => s.remove());
  document.querySelectorAll('.butterfly-wrapper').forEach(b => b.remove());

  const screenW = window.innerWidth;
  const screenH = window.innerHeight;
  const isPortrait = screenH >= screenW;

  const numStars = isPortrait ? 80 : 120;

  /* Stars */
  const starsContainer = document.querySelector(".stars");
  for (let i = 0; i < numStars; i++) {
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
}

// Shooting stars
function createShootingStar() {
  const star = document.createElement("div");
  star.className = "shooting-star";

  const startX = Math.random() * window.innerWidth * 0.8 + 50;
  const startY = Math.random() * window.innerHeight * 0.4;
  const length = 200 + Math.random() * 150;
  const angle = -Math.PI / 4; // 45 degrees upward left

  star.style.width = `${length}px`;
  star.style.height = `2px`;
  star.style.background = "linear-gradient(270deg, white, rgba(255,255,255,0))";
  star.style.position = "absolute";
  star.style.left = `${startX}px`;
  star.style.top = `${startY}px`;
  star.style.transform = `rotate(${angle}rad)`;
  star.style.opacity = 1;
  star.style.transition = "transform 1.5s linear, opacity 1.5s linear";

  document.body.appendChild(star);

  requestAnimationFrame(() => {
    const endX = startX + Math.cos(angle) * length * 2;
    const endY = startY + Math.sin(angle) * length * 2;
    star.style.transform = `translate(${endX - startX}px, ${endY - startY}px) rotate(${angle}rad)`;
    star.style.opacity = 0;
  });

  setTimeout(() => star.remove(), 1600);
}

// Randomly create shooting stars
setInterval(() => {
  if (Math.random() < 0.3) createShootingStar();
}, 8000);

// Continuous butterflies
const butterflyColors = [
  "rgba(255,121,198,0.5)",
  "rgba(139,233,253,0.5)",
  "rgba(80,250,123,0.5)",
  "rgba(241,250,140,0.5)",
  "rgba(255,184,108,0.5)",
  "rgba(189,147,249,0.5)"
];

function spawnButterfly() {
  const wrapper = document.createElement("div");
  wrapper.className = "butterfly-wrapper";

  const butterfly = document.createElement("div");
  butterfly.className = "butterfly";
  butterfly.textContent = "🦋";
  butterfly.style.color = butterflyColors[Math.floor(Math.random() * butterflyColors.length)];
  butterfly.style.fontSize = `${1.2 + Math.random() * 1.5}rem`;

  wrapper.appendChild(butterfly);
  document.querySelector(".butterflies").appendChild(wrapper);

  let x = Math.random() * window.innerWidth;
  let y = window.innerHeight + 50;
  let swayAmplitude = 20 + Math.random() * 30;
  let swaySpeed = 0.02 + Math.random() * 0.02;
  let speedY = 0.5 + Math.random() * 0.5;
  let angle = 0;

  function animate() {
    y -= speedY;
    angle += swaySpeed;
    wrapper.style.transform = `translate(${x + Math.sin(angle) * swayAmplitude}px, ${y}px)`;
    if (y < -50) wrapper.remove();
    else requestAnimationFrame(animate);
  }
  animate();
}

// Spawn butterflies every 1.2s
setInterval(spawnButterfly, 1200);

// Initialize scene
setupScene();

// Recalculate on resize or orientation change
window.addEventListener("resize", setupScene);
window.addEventListener("orientationchange", setupScene);
