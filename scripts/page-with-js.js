const linkHome = document.getElementById("linkHome");

linkHome.addEventListener(
  "mouseover",
  (event) => {
    event.target.style.color = "green";

    setTimeout(() => {
      event.target.style.color = "";
    }, 500);
  },
  false
);

const linkCss = document.getElementById("linkCss");

linkCss.addEventListener(
  "mouseover",
  (event) => {
    event.target.style.color = "blue";

    setTimeout(() => {
      event.target.style.color = "";
    }, 500);
  },
  false
);

const linkJs = document.getElementById("linkJs");

linkJs.addEventListener(
  "mouseover",
  (event) => {
    event.target.style.color = "red";

    setTimeout(() => {
      event.target.style.color = "";
    }, 500);
  },
  false
);

const linkAvatar = document.getElementById("linkAvatar");

linkAvatar.addEventListener(
  "mouseover",
  (event) => {
    event.target.style.color = "purple";

    setTimeout(() => {
      event.target.style.color = "";
    }, 500);
  },
  false
);

const linkBackground = document.getElementById("linkBackground");

linkBackground.addEventListener(
  "mouseover",
  (event) => {
    event.target.style.color = "orange";

    setTimeout(() => {
      event.target.style.color = "";
    }, 500);
  },
  false
);
