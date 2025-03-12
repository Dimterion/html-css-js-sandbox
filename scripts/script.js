const pages = [
  "Animations",
  "Compilation",
  "Configurator",
  "Gallery",
  "GitHub-landing-page",
  "InteractiveTable",
  "ScrollSnap",
  "Search",
  "Tasks",
  "ThemeSwitcher",
];
const indexNav = document.getElementById("index-nav");

pages.forEach((page) => {
  const indexA = document.createElement("a");
  
  indexA.innerText = page;

  indexA.classList.add("index-a");

  indexA.setAttribute("href", `../pages/${page.toLowerCase()}.html`);

  indexNav.appendChild(indexA);
});
