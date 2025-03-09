// \/ Images comparison \/
range.oninput = () =>
  document.body.style.setProperty("--position", range.value + "%");
// /\ Images comparison /\

// \/ Mouse move shadow \/
const mouseMoveShadowDiv = document.querySelector(".mouseMoveShadow-div");
const mouseMoveShadowH3 = document.querySelector(".mouseMoveShadow-h3");
const distance = 500;

function mouseMoveShadow(e) {
  const { offsetWidth: width, offsetHeight: height } = mouseMoveShadowDiv;
  let { offsetX: x, offsetY: y } = e;

  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }

  const xDistance = Math.round((x / width) * distance - distance / 2);
  const yDistance = Math.round((y / height) * distance - distance / 2);

  mouseMoveShadowH3.style.textShadow = `${xDistance}px ${yDistance}px 0 rgba(255,0,255,0.7),
      ${xDistance * -1}px ${yDistance}px 0 rgba(0,255,255,0.7),
      ${yDistance}px ${xDistance * -1}px 0 rgba(0,255,0,0.7),
      ${yDistance * -1}px ${xDistance}px 0 rgba(0,0,255,0.7)`;
}

mouseMoveShadowDiv.addEventListener("mousemove", mouseMoveShadow);
// /\ Mouse move shadow /\

// \/ Expandable article \/
const expandableElements = document.querySelectorAll("[data-expandable]");
const expandableButtons = document.querySelectorAll("[data-expand-button]");

checkForOverflow();
expandableButtons.forEach((button) => {
  button.addEventListener("click", toggleText);
  setExpandButtonText(button);
});

function checkForOverflow() {
  expandableElements.forEach((expandableElement) => {
    if (expandableElement.classList.contains("expanded")) return;

    const expandableText =
      expandableElement.querySelector("[data-expand-text]");
    const overflowing =
      expandableText.scrollHeight > expandableText.clientHeight;

    expandableElement.dataset.overflow = overflowing;
  });
}

function toggleText(e) {
  const expandableElement = e.target.closest("[data-expandable]");

  expandableElement.classList.toggle("expanded");
  setExpandButtonText(e.target);
}

function setExpandButtonText(button) {
  const expandableElement = button.closest("[data-expandable]");
  const expanded = expandableElement.classList.contains("expanded");

  button.innerText = expanded ? "Read Less" : "Read More";
}
// /\ Expandable article /\
