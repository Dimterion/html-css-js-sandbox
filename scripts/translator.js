const voiceSelect = document.querySelector("#voiceSelect");
const playButton = document.querySelector("#playButton");
const textInput = document.querySelector("textarea");
const languageSelect = document.querySelector("#languageSelect");
const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
];
let voices = [];

languages.forEach(({ code, name }) => {
  const option = document.createElement("option");

  option.value = code;

  option.textContent = name;

  languageSelect.appendChild(option);
});

function loadVoices() {
  voices = speechSynthesis.getVoices();

  voiceSelect.innerHTML = voices
    .map(
      (voice, index) =>
        `<option value="${index}>${voice.name} (${voice.lang})</option>`
    )
    .join("");
}

speechSynthesis.onvoiceschanged = loadVoices;

loadVoices();

playButton.addEventListener("click", () => {
  const utterance = new SpeechSynthesisUtterance(textInput.value);
  const selectedVoice = voices[voiceSelect.value];

  if (selectedVoice) utterance.voice = selectedVoice;

  speechSynthesis.speak(utterance);
});
