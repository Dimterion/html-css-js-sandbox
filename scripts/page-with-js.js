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
