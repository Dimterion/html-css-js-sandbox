export default function getWeather() {
  const city = document.getElementById("cityInput").value;
  const url = ``;
  console.log(city);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weatherInfo = document.getElementById("weatherInfo");
      weatherInfo.innerHTML = `<p>${data}</p>`;
    })
    .catch((error) => {
      console.error("Error.");
    });
}

const btn = document.getElementById("getWeather");
btn.addEventListener("click", () => getWeather());
