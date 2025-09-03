const pages = [
  "Animations",
  "Compilation",
  "Configurator",
  "DrumKit",
  "Gallery",
  "GitHub-landing-page",
  "HorizontalScroll",
  "InteractiveTable",
  "ScrollSnap",
  "Search",
  "Tasks",
  "ThemeSwitcher",
  "Timer",
];
const indexNav = document.getElementById("index-nav");

pages.forEach((page) => {
  const indexA = document.createElement("a");

  indexA.innerText = page;

  indexA.classList.add("index-a");

  indexA.setAttribute("href", `../pages/${page.toLowerCase()}.html`);

  indexNav.appendChild(indexA);
});

document.getElementById("year").textContent = new Date().getFullYear();
