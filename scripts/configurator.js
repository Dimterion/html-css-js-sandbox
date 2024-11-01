const topBar = document.querySelector("#top-bar");
const exteriorColorSection = document.querySelector("#exterior-buttons");
const interiorColorSection = document.querySelector("#interior-buttons");
const exteriorImage = document.querySelector("#exterior-image");
const interiorImage = document.querySelector("#interior-image");

// Turn on/off top bar on scroll
const handleScroll = () => {
  const atTop = window.scrollY === 0;

  topBar.classList.toggle("visible-bar", atTop);
  topBar.classList.toggle("hidden-bar", !atTop);
};

// Img mapping
const exteriorImages = {
  "Stealth Grey": "../assets/configurator/configurator_stealth_grey.svg",
  "Pearl White": "../assets/configurator/configurator_pearl_white.svg",
  "Deep Blue": "../assets/configurator/configurator_deep_blue.svg",
  "Solid Black": "../assets/configurator/configurator_solid_black.svg",
  "Ultra Red": "../assets/configurator/configurator_ultra_red.svg",
  "Dark Grey": "../assets/configurator/configurator_dark_grey.svg",
};

const interiorImages = {
  Dark: "../assets/configurator/configurator_stealth_grey.svg",
  Light: "../assets/configurator/configurator_pearl_white.svg",
};

// Color selection
const handleColorButtonClick = (event) => {
  let button;

  if (event.target.tagName === "IMG") {
    button = event.target.closest("button");
  } else if (event.target.tagName === "BUTTON") {
    button = event.target;
  }

  if (button) {
    const buttons = event.currentTarget.querySelectorAll("button");

    buttons.forEach((btn) => btn.classList.remove("btn-selected"));

    button.classList.add("btn-selected");

    // Change exterior img
    if (event.currentTarget === exteriorColorSection) {
      const color = button.querySelector("img").alt;

      exteriorImage.src = exteriorImages[color];
    }

    // Change interior img
    if (event.currentTarget === interiorColorSection) {
      const color = button.querySelector("img").alt;

      interiorImage.src = interiorImages[color];
    }
  }
};

// Event listeners
window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));
exteriorColorSection.addEventListener("click", handleColorButtonClick);
interiorColorSection.addEventListener("click", handleColorButtonClick);
