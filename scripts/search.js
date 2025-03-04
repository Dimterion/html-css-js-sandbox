const endpoint = "../assets/search/search-list.json";
const cities = [];

const prom = fetch(endpoint)
  .then((data) => data.json())
  .then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");

    return place.city.match(regex) || place.department.match(regex);
  });
}

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="highlight">${this.value}</span>`
      );
      const departmentName = place.department.replace(
        regex,
        `<span class="highlight">${this.value}</span>`
      );

      if (this.value === "") return;

      return `<li>
    <span>${cityName}, ${departmentName}</span>
    <span class="population">${numberWithCommas(place.population)}</span>
    </li>`;
    })
    .join("");

  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);

const nav = document.querySelector("#main");
const topOfNav = nav.offsetTop;

function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + "px";

    document.body.classList.add("fixed-nav");
  } else {
    document.body.style.paddingTop = 0;

    document.body.classList.remove("fixed-nav");
  }
}

window.addEventListener("scroll", fixNav);
