const topBar = document.querySelector("#top-bar");
const exteriorColorSection = document.querySelector("#exterior-buttons");
const interiorColorSection = document.querySelector("#interior-buttons");
const exteriorImage = document.querySelector("#exterior-image");
const interiorImage = document.querySelector("#interior-image");
const wheelButtonsSection = document.querySelector("#wheel-buttons");
let selectedColor = "Stealth Grey";
const selectedOptions = {
  "Performance Wheels": false,
  "Performance Package": false,
  "Full Self-Driving": false,
};

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
      selectedColor = button.querySelector("img").alt;

      updateExteriorImage();
    }

    // Change interior img
    if (event.currentTarget === interiorColorSection) {
      const color = button.querySelector("img").alt;

      interiorImage.src = interiorImages[color];
    }
  }
};

// Update exterior img based on color and wheels
const updateExteriorImage = () => {
  const performanceSuffix = selectedOptions["Performance Wheels"]
    ? "-performance"
    : "";
  const colorKey =
    selectedColor in exteriorImages ? selectedColor : "Stealth Grey";

  exteriorImage.src = exteriorImages[colorKey].replace(
    ".svg",
    `${performanceSuffix}.svg`
  );
};

// Wheel selection
const handleWheelButtonClick = (event) => {
  if (event.target.tagName === "BUTTON") {
    const buttons = document.querySelectorAll("#wheel-buttons button");

    buttons.forEach((btn) => btn.classList.remove("bg-gray-700", "text-white"));

    // Add selected styles to clicked btn
    event.target.classList.add("bg-gray-700", "text-white");

    selectedOptions["Performance Wheels"] =
      event.target.textContent.includes("Performance");

    updateExteriorImage();
  }
};

// Event listeners
window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));
exteriorColorSection.addEventListener("click", handleColorButtonClick);
interiorColorSection.addEventListener("click", handleColorButtonClick);
wheelButtonsSection.addEventListener("click", handleWheelButtonClick);
