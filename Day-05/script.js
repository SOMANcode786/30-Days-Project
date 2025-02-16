document.addEventListener("DOMContentLoaded", loadTasks);
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Add a new task
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  addTask(taskText);
  saveTask(taskText);
  taskInput.value = "";
});

// Add task to the list
function addTask(taskText, completed = false) {
  const li = document.createElement("li");
  li.textContent = taskText;
  if (completed) {
    li.classList.add("completed");
  }

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTaskStatus(taskText);
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "❌";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", () => {
    li.remove();
    removeTask(taskText);
  });

  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTask(task.text, task.completed));
}

// Update task completion status
function updateTaskStatus(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    if (task.text === taskText) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task from localStorage
function removeTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
