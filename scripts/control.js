let parts = [];
let currentIndex = 0;

async function loadText() {
  try {
    const response = await fetch("../assets/control/control.json");
    if (!response.ok) throw new Error("Failed to load JSON");
    const data = await response.json();

    const keys = Object.keys(data).sort();
    parts = keys.map((k) => data[k]);

    currentIndex = 0;
    render();
  } catch (err) {
    console.error(err);
    document.getElementById("text-container").textContent =
      "Error loading text. Check console for details.";
  }
}

function render() {
  if (parts.length === 0) return;

  const part = parts[currentIndex];

  // Header
  document.getElementById("part-number").textContent = `Part ${part.number}`;
  document.getElementById("part-title").textContent = part.title;

  // Main text
  document.getElementById("text-container").innerHTML = part.text;

  // Progress bar
  const progress = ((currentIndex + 1) / parts.length) * 100;
  document.getElementById("progress-bar").style.width = `${progress}%`;

  // Part counter (e.g., "1/3")
  document.getElementById("part-counter").textContent =
    `${currentIndex + 1}/${parts.length}`;

  // Buttons
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === parts.length - 1;
}

function goToNext() {
  if (currentIndex < parts.length - 1) {
    currentIndex++;
    render();
  }
}

function goToPrev() {
  if (currentIndex > 0) {
    currentIndex--;
    render();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadText();

  document.getElementById("next-btn").addEventListener("click", goToNext);
  document.getElementById("prev-btn").addEventListener("click", goToPrev);
});
