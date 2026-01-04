// State
const formData = {
  name: "",
  email: "",
};

// Elements
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

const reviewName = document.getElementById("reviewName");
const reviewEmail = document.getElementById("reviewEmail");

const next1 = document.getElementById("next1");
const next2 = document.getElementById("next2");
const prev2 = document.getElementById("prev2");
const prev3 = document.getElementById("prev3");
const submit = document.getElementById("submit");

// Show/hide steps
function showStep(step) {
  step1.classList.add("hidden");
  step2.classList.add("hidden");
  step3.classList.add("hidden");

  if (step === 1) step1.classList.remove("hidden");
  if (step === 2) step2.classList.remove("hidden");
  if (step === 3) step3.classList.remove("hidden");
}

// Actions
next1.addEventListener("click", () => {
  formData.name = nameInput.value.trim();

  if (!formData.name) {
    alert("Enter name.");

    return;
  }

  showStep(2);
});

prev2.addEventListener("click", () => showStep(1));

next2.addEventListener("click", () => {
  formData.email = emailInput.value.trim();

  if (!formData.email) {
    alert("Enter email.");

    return;
  }

  reviewName.textContent = formData.name;
  reviewEmail.textContent = formData.email;

  showStep(3);
});

prev3.addEventListener("click", () => showStep(2));

submit.addEventListener("click", () => {
  alert(`Submitted.\nName: ${formData.name}\nEmail: ${formData.email}`);

  // Reset form after submitting
  formData.name = "";
  formData.email = "";

  nameInput.value = "";
  emailInput.value = "";

  reviewName.textContent = "";
  reviewEmail.textContent = "";

  showStep(1);
});

showStep(1);
