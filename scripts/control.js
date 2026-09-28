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
    document.getElementById("text-container").innerHTML =
      "Error loading text. Check console for details.";
  }
}

function render() {
  if (parts.length === 0) return;

  const part = parts[currentIndex];

  const partNumberEl = document.getElementById("part-number");
  const partTitleEl = document.getElementById("part-title");
  const partTextEl = document.getElementById("part-text");

  partNumberEl.textContent = `Part ${part.number}`;
  partTitleEl.textContent = part.title;
  partTextEl.textContent = part.text;

  const progress = ((currentIndex + 1) / parts.length) * 100;
  document.getElementById("progress-bar").style.width = `${progress}%`;

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
