// Color scheme changing
const isDarkScheme =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark").matches;

const colorSchemeStatus = document.getElementById("color-scheme-status");

if (isDarkScheme) {
  colorSchemeStatus.innerText =
    "The page is displayed in dark mode based on your system preferences";
} else {
  colorSchemeStatus.innerText =
    "The page is displayed in light mode based on your system preferences";
}

// Changing the font size
let toggleFontChange = false;
const body = document.getElementsByTagName("body")[0];

function changeFontSize() {
  toggleFontChange = !toggleFontChange;
  if (toggleFontChange) {
    body.style.fontSize = "1.25rem";
  } else {
    body.style.fontSize = "1rem";
  }
}
