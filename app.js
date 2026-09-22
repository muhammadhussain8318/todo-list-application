const STORAGE_KEY = "done-today-tasks";
let tasks = loadTasks();
let currentFilter = "all";

const $ = (selector) => document.querySelector(selector);
const form = $("#taskForm");
const taskInput = $("#taskInput");
const taskList = $("#taskList");
const emptyState = $("#emptyState");
const searchInput = $("#searchInput");

$("#today").textContent = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(new Date());
form.addEventListener("submit", addTask);
searchInput.addEventListener("input", render);
$("#clearCompleted").addEventListener("click", () => { tasks = tasks.filter((task) => !task.completed); saveTasks(); render(); });
document.querySelectorAll(".filter").forEach((button) => button.addEventListener("click", () => {
  currentFilter = button.dataset.filter;
  document.querySelectorAll(".filter").forEach((filter) => filter.classList.toggle("active", filter === button));
  render();
}));

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}
function saveTasks() { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }
function addTask(event) {
  event.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;
  tasks.unshift({ id: Date.now(), title, completed: false, createdAt: new Date().toISOString() });
  saveTasks();
  form.reset();
  taskInput.focus();
  render();
}
function toggleTask(id) {
  tasks = tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task);
  saveTasks();
  render();
}
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  render();
}
function getVisibleTasks() {
  const query = searchInput.value.trim().toLowerCase();
  return tasks.filter((task) => {
    const filterMatches = currentFilter === "all" || (currentFilter === "active" && !task.completed) || (currentFilter === "completed" && task.completed);
    return filterMatches && task.title.toLowerCase().includes(query);
  });
}
function render() {
  const visibleTasks = getVisibleTasks();
  taskList.innerHTML = visibleTasks.map((task) => `<article class="task ${task.completed ? "completed" : ""}">
    <input class="task-check" type="checkbox" ${task.completed ? "checked" : ""} aria-label="Complete ${escapeHtml(task.title)}" data-action="toggle" data-id="${task.id}">
    <div><p class="task-title">${escapeHtml(task.title)}</p><span class="task-time">Added ${formatTime(task.createdAt)}</span></div>
    <button class="delete" type="button" aria-label="Delete ${escapeHtml(task.title)}" data-action="delete" data-id="${task.id}">x</button>
  </article>`).join("");
  emptyState.hidden = visibleTasks.length > 0;
  taskList.querySelectorAll("[data-action]").forEach((control) => control.addEventListener("click", () => control.dataset.action === "toggle" ? toggleTask(Number(control.dataset.id)) : deleteTask(Number(control.dataset.id))));
  updateSummary();
}
function updateSummary() {
  const completed = tasks.filter((task) => task.completed).length;
  const total = tasks.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  $("#progressBar").style.width = `${percent}%`;
  $("#progressText").textContent = `${percent}% complete`;
  $("#taskCount").textContent = `${total} ${total === 1 ? "task" : "tasks"}`;
  $("#summaryTitle").textContent = total === 0 ? "Let's get started." : completed === total ? "All done for today." : `${total - completed} task${total - completed === 1 ? "" : "s"} in motion.`;
  $("#footerMessage").textContent = total && completed === total ? "You made it happen." : "Small steps count.";
}
function formatTime(dateString) { return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(dateString)); }
function escapeHtml(value) { return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character])); }
render();
