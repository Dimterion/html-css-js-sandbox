function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

  if (!audio) return;

  key.style.animationPlayState = "running";

  const element = key;
  const clonedElement = element.cloneNode(true);

  element.parentNode.replaceChild(clonedElement, element);

  audio.currentTime = 0;

  audio.play();
}

window.addEventListener("keydown", playSound);
