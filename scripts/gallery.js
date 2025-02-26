const slides = document.querySelectorAll(".slide");

function toggleOpen() {
  this.classList.toggle("open");
}

function toggleActive(e) {
  if (e.propertyName.includes("flex")) {
    this.classList.toggle("open-active");
  }
}

slides.forEach((slide) => slide.addEventListener("click", toggleOpen));

slides.forEach((slide) =>
  slide.addEventListener("transitionend", toggleActive)
);
