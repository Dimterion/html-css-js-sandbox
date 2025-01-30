const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const tasksList = document.getElementById("tasks-list");
const themeBtn = document.getElementById("tasks-theme-btn");

// Load tasks and theme from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  // Load tasks
  let savedTasks = [];

  try {
    savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  } catch (e) {
    console.error("Error parsing tasks from localStorage.", e);
  }

  savedTasks.forEach((task) => {
    addTaskToDOM(task.text, task.completed);
  });

  // Load theme
  const savedTheme = localStorage.getItem("theme") || "light";

  document.body.dataset.theme = savedTheme;

  updateThemeButton(savedTheme);
});

// Add task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if (taskText) {
    addTaskToDOM(taskText, false);

    saveTasksToLocalStorage();

    taskInput.value = "";
  }
});

// Add task to DOM
const addTaskToDOM = (taskText, isCompleted) => {
  const li = document.createElement("li");

  li.innerHTML = `
    <span>${taskText}</span>
    <button>Delete</button>
  `;

  if (isCompleted) {
    li.querySelector("span").classList.add("completed");
  }

  tasksList.appendChild(li);

  addTaskEvents(li);
};

// Mark as complete / delete task
const addTaskEvents = (li) => {
  const taskText = li.querySelector("span");
  const deleteBtn = li.querySelector("button");

  taskText.addEventListener("click", () => {
    taskText.classList.toggle("completed");

    // Update localStorage when task is marked as complete
    saveTasksToLocalStorage();
  });

  deleteBtn.addEventListener("click", () => {
    tasksList.removeChild(li);

    // Update localStorage when task is deleted
    saveTasksToLocalStorage();
  });
};

// Save tasks to localStorage
const saveTasksToLocalStorage = () => {
  const tasks = Array.from(document.querySelectorAll("#tasks-list li")).map(
    (li) => ({
      text: li.querySelector("span").textContent,
      completed: li.querySelector("span").classList.contains("completed"),
    })
  );

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Dark/light mode toggle
themeBtn.addEventListener("click", () => {
  const newTheme = document.body.dataset.theme === "dark" ? "light" : "dark";

  document.body.dataset.theme = newTheme;
  updateThemeButton(newTheme);

  // Save theme to localStorage
  localStorage.setItem("theme", newTheme);
});

// Update theme button text
const updateThemeButton = (theme) => {
  themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
};
