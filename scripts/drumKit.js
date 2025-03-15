window.addEventListener("keydown", function (e) {
  const audio = this.document.querySelector(`audio[data-key="${e.key}"]`);

  if (!audio) return;

  audio.play();
});
