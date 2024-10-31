const topBar = document.querySelector("#top-bar");

// Turn on/off top bar on scroll
const handleScroll = () => {
  const atTop = window.scrollY === 0;

  topBar.classList.toggle("visible-bar", atTop);
  topBar.classList.toggle("hidden-bar", !atTop);
};

// Event listeners
window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));
