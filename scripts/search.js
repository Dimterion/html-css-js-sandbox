const endpoint = "../assets/search/search-list.json";
const cities = [];

const prom = fetch(endpoint)
  .then((data) => data.json())
  .then((data) => cities.push(...data));

console.log(cities);

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");

    return place.city.match(regex) || place.department.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      return `<li>
    <span class="name">${place.city}, ${place.department}</span>
    </li>`;
    })
    .join("");

  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
