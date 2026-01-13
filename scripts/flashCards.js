let flashcardData = null;

async function loadData() {
  const response = await fetch("../assets/flashCards/flashCards.json");

  if (!response.ok) {
    throw new Error("Failed to load data.");
  }

  return response.json();
}

function createSetCard(set) {
  const card = document.createElement("article");

  card.className = "set-card";
  card.innerHTML = `<h3>${set.title}</h3><p>${set.description}</p>`;

  card.addEventListener("click", () => {
    renderSetCards(set);
  });

  return card;
}

function renderSetCards(set) {
  const cardsSection = document.createElement("section");

  const title = document.createElement("h2");
  title.className = "section-title";
  title.textContent = "Set: " + set.title;
  cardsSection.appendChild(title);

  const cardsContainer = document.createElement("div");
  cardsContainer.className = "cards-container";

  set.cards.forEach((card) => {
    const cardContainer = document.createElement("article");
    cardContainer.className = "card";

    const inner = document.createElement("div");
    inner.className = "card-inner";
    inner.innerHTML = `<p class="card-face card-front">${card.front}</p><p class="card-face card-back">${card.back}</p>`;

    inner.addEventListener("click", (e) => {
      e.stopPropagation();
      cardContainer.classList.toggle("flipped");
    });

    cardContainer.appendChild(inner);
    cardsContainer.appendChild(cardContainer);
  });

  cardsSection.appendChild(cardsContainer);

  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "Back to sets";
  backBtn.addEventListener("click", () => {
    renderAllSets();
  });
  cardsSection.appendChild(backBtn);

  const app = document.getElementById("app");
  app.innerHTML = "";
  app.appendChild(cardsSection);
}

function renderAllSets() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const setsSection = document.createElement("section");
  setsSection.className = "sets-section";

  flashcardData.sets.forEach((set) => {
    setsSection.appendChild(createSetCard(set));
  });

  app.appendChild(setsSection);
}

async function renderContent() {
  try {
    flashcardData = await loadData();
    renderAllSets();
  } catch (err) {
    console.error(err);
    document.getElementById("app").textContent =
      "Failed to load flashcards data.";
  }
}

renderContent();
