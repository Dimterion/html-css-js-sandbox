let timerInterval;

const countdownDisplay = document.getElementById("countdownDisplay");

countdownDisplay.textContent = "0:00";

function startTimer() {
  const minutes = parseInt(document.getElementById("minutesInput").value);

  if (isNaN(minutes) || minutes <= 0) {
    alert("Please enter a valid number of minutes.");
    return;
  }

  let timeRemaining = minutes * 60;

  updateDisplay(timeRemaining);

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeRemaining--;

    updateDisplay(timeRemaining);

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);

      sendNotification();
    }
  }, 1000);
}

function updateDisplay(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  countdownDisplay.textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function sendNotification(pageTitle = "Time's up!") {
  // Send notification or alert
  if (Notification.permission === "granted") {
    new Notification("⏰Time's up!");
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("⏰Time's up!");
      } else {
        alert("⏰Time's up!");
      }
    });
  } else {
    alert("⏰Time's up!");
  }

  // Flash page title
  let originalTitle = document.title;
  let visible = true;

  const interval = setInterval(() => {
    document.title = visible ? pageTitle : originalTitle;
    visible = !visible;
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
    document.title = originalTitle;
  }, 10000);
}
