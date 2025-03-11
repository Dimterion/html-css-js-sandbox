const pages = ["compilation", "gallery"];
const indexNav = document.getElementById("index-nav");

pages.forEach((page) => {
  const indexA = document.createElement("a");
  indexA.innerText = page;

  indexNav.appendChild(indexA);
});
