let countDiv = document.querySelector(".count");
let counter = +countDiv.innerHTML;
let upperPiece = document.querySelector(".upper-piece");

let interval = setInterval(() => {
  countDiv.classList.remove("zoomOut");
  upperPiece.classList.remove("roll");
  decrementCounter();
}, 1500);

function decrementCounter() {
  counter--;

  setTimeout(() => {
    countDiv.classList.add("zoomOut");
    upperPiece.classList.add("roll");
  }, 30);

  if (counter > 0) {
    countDiv.innerHTML = counter;
  } else {
    countDiv.innerHTML = 0;
    clearInterval(interval);
  }
}
