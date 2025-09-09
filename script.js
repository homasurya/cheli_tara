let notes = [];
let usedIndexes = [];

// Load notes from JSON
fetch('notes.json')
  .then(response => response.json())
  .then(data => {
    notes = data;
  });

document.getElementById("surpriseBtn").addEventListener("click", () => {
  if (notes.length === 0) return;

  if (usedIndexes.length === notes.length) {
    usedIndexes = [];
  }

  let index;
  do {
    index = Math.floor(Math.random() * notes.length);
  } while (usedIndexes.includes(index));

  usedIndexes.push(index);

  const noteEl = document.createElement("div");
  noteEl.className = "note";
  noteEl.textContent = notes[index];
  document.getElementById("notesContainer").appendChild(noteEl);
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
for (let i = 0; i < 12; i++) {
  const wrapper = document.createElement("div");
  wrapper.className = "butterfly-wrapper";
  wrapper.style.left = Math.random() * 100 + "vw";
  wrapper.style.top = "100vh";

  const butterfly = document.createElement("div");
  butterfly.className = "butterfly";
  butterfly.textContent = "🦋";

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

/* --- Shooting Star Occasionally --- */
function createShootingStar() {
  const shootingStar = document.createElement("div");
  shootingStar.className = "shooting-star";
  shootingStar.style.top = Math.random() * 50 + "vh";
  shootingStar.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(shootingStar);

  setTimeout(() => shootingStar.remove(), 2000);
}
setInterval(() => {
  if (Math.random() < 0.3) createShootingStar();
}, 10000);
