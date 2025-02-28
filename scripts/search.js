const endpoint = "../assets/search/search-list.json";
const cities = [];

const prom = fetch(endpoint)
  .then((data) => data.json())
  .then((data) => cities.push(...data));

  console.log(cities)

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");

    return place.city.match(regex) || place.department.match(regex);
  });
}
