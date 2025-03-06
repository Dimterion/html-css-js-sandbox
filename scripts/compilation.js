// \/ Images comparison \/
range.oninput = () =>
  document.body.style.setProperty("--position", range.value + "%");
// /\ Images comparison /\

// \/ Mouse move shadow \/
const mouseMoveShadowDiv = document.querySelector(".mouseMoveShadow-div");
const mouseMoveShadowH3 = document.querySelector(".mouseMoveShadow-h3");

function mouseMoveShadow(e) {
  const { offsetWidth: width, offsetHeight: height } = mouseMoveShadowDiv;
  let { offsetX: x, offsetY: y } = e;

  console.log(x, y);
}

mouseMoveShadowDiv.addEventListener("mousemove", mouseMoveShadow);
// /\ Mouse move shadow /\
