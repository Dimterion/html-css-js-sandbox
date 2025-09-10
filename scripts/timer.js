document.addEventListener("DOMContentLoaded", () => {
  if (
    Notification.permission !== "granted" &&
    Notification.permission !== "denied"
  ) {
    Notification.requestPermission();
  }
});

let timerInterval;

const countdownDisplay = document.getElementById("countdownDisplay");

countdownDisplay.textContent = "0:00";

function startTimer(interval) {
  let minutes;

  if (interval) {
    minutes = interval;
  } else {
    minutes = parseInt(document.getElementById("minutesInput").value);
  }

  if (isNaN(minutes) || minutes <= 0) {
    alert("Please enter a valid number of minutes.");
    return;
  }

  let timeRemaining = minutes * 60;

  updateDisplay(timeRemaining);

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeRemaining--;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);

      sendNotification();

      return;
    }

    updateDisplay(timeRemaining);
  }, 1000);
}

function updateDisplay(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  countdownDisplay.textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function changeFavicon(emoji) {
  const favicon = document.getElementById("favicon");
  const svgEmoji = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
      <text y='1em' font-size='90'>${emoji}</text>
    </svg>
  `;
  const encoded = encodeURIComponent(svgEmoji.trim());
  favicon.href = `data:image/svg+xml,${encoded}`;
}

function sendNotification(pageTitle = "Time's up!") {
  if (Notification.permission === "granted") {
    new Notification("⏰ Time's up!");
  } else {
    alert("⏰ Time's up!");
  }

  changeFavicon("⏰");

  // Flash page title
  const originalTitle = document.title;
  let visible = true;

  const interval = setInterval(() => {
    document.title = visible ? pageTitle : originalTitle;
    visible = !visible;
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);

    // Set original title
    document.title = originalTitle;

    // Set original favicon
    changeFavicon("⏱️");
  }, 10000);
}
