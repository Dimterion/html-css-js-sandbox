export default function getWeather() {
  const city = document.getElementById("cityInput").value;
  console.log(city);
}

const btn = document.getElementById("getWeather");
btn.addEventListener("click", () => getWeather());
