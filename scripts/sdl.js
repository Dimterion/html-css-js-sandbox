document.addEventListener("DOMContentLoaded", () => {
  const lines = [
    "One day you wake up and find yourself in a world that is a copy of yours.",
    "It feels okay at first, but then you start to notice some oddities.",
    "Some discrepancies that stand out.",
    "Maybe you're just imagining things, and everything is fine.",
    "Or not.",
    "Yesterday, you were a happy little soul, discovering the wonders of developing.",
    "You were making things, programming, solving problems.",
    "Today, you are a tired old being, prompting your way through hallucinations and code creep.",
    "You are telling your artificial assistant what to do.",
    "Yesterday, you had all your repos updated, looking shiny and modern.",
    "Today, you get a hundred warnings of security breaches and all sorts of leaks.",
    "Yesterday, you bought RAM for less than a dinner at a good restaurant.",
    "Today, RAM costs as much as a Michelin-starred establishment.",
    "Life moves on, and you keep on going.",
    "Some things change; others remain the same.",
    "Some say it's the best thing that could have happened; others preach that it's our final doom.",
    "And some stay in the middle, watching the debate carry on.",
    "The world keeps spinning, faster with every day.",
    "Yesterday's hard work is today's routine and tomorrow's history.",
    "Whatever and however you do it isn't fast enough.",
    "Should you complain?",
    "You can.",
    "Should you keep going?",
    "You can as well.",
    "Should you adapt, do both, or stay and watch the world go by?",
    "All of those are valid options too.",
    "There is no right or wrong response to this.",
    "Good thing that's just a copy of the world we live in.",
    "It's just a side-effect dream of social distancing and spending too much time at home.",
    "We can just go outside and touch some grass.",
    "And everything will roll back to its former state.",
    "The way things always do when you're dreaming.",
    "Because the whole of life is just another dream. Right?",
    "Oh, wait...",
  ];

  const slide = document.getElementById("slide");
  const skull = document.getElementById("skull");
  const nextButton = document.getElementById("next");
  const restartButton = document.getElementById("restart");
  const progress = document.getElementById("progress");

  let index = 0;

  function showSlide() {
    slide.classList.remove("visible");
    skull.classList.remove("visible");
    skull.hidden = true;

    setTimeout(() => {
      slide.textContent = lines[index];
      slide.classList.add("visible");

      progress.textContent = `${index + 1} / ${lines.length}`;

      const isLastSlide = index === lines.length - 1;

      nextButton.hidden = isLastSlide;
      restartButton.hidden = !isLastSlide;

      if (isLastSlide) {
        skull.hidden = false;

        requestAnimationFrame(() => {
          skull.classList.add("visible");
        });
      }
    }, 180);
  }

  nextButton.addEventListener("click", () => {
    if (index < lines.length - 1) {
      index++;
      showSlide();
    }
  });

  restartButton.addEventListener("click", () => {
    index = 0;
    showSlide();
  });

  showSlide();
});
