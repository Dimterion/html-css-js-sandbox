document.addEventListener("DOMContentLoaded", () => {
  // State
  const formData = {
    name: "",
    email: "",
  };

  // Elements
  const form = document.getElementById("multiStepForm");

  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");

  const err1 = document.getElementById("err1");
  const err2 = document.getElementById("err2");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");

  const reviewName = document.getElementById("reviewName");
  const reviewEmail = document.getElementById("reviewEmail");

  const next1 = document.getElementById("next1");
  const next2 = document.getElementById("next2");
  const prev1 = document.getElementById("prev1");
  const prev2 = document.getElementById("prev2");

  // Steps
  const steps = [step1, step2, step3];

  // Show/hide steps
  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle("hidden", i !== index);
    });

    const currentStep = steps[index];
    const firstInput = currentStep.querySelector(
      "input, button, select, textarea"
    );

    if (firstInput) {
      firstInput.focus();
    }
  }

  // Form validation
  function validateInput(input, error, text) {
    const value = input.value.trim();

    if (!value) {
      error.textContent = text;

      return null;
    }

    error.textContent = "";

    return value;
  }

  // Actions
  next1.addEventListener("click", () => {
    const name = validateInput(nameInput, err1, "Enter name");

    if (!name) return;

    formData.name = name;

    showStep(1);
  });

  prev1.addEventListener("click", () => showStep(0));

  next2.addEventListener("click", () => {
    const email = validateInput(emailInput, err2, "Enter email");

    if (!email) return;

    formData.email = email;
    reviewName.textContent = formData.name;
    reviewEmail.textContent = formData.email;

    showStep(2);
  });

  prev2.addEventListener("click", () => showStep(1));

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (formData.name === "" || formData.email === "") return;

    alert(`Submitted.\nName: ${formData.name}\nEmail: ${formData.email}`);

    // Reset form after submitting
    formData.name = "";
    formData.email = "";

    form.reset();

    reviewName.textContent = "";
    reviewEmail.textContent = "";

    showStep(0);
  });

  showStep(0);
});
