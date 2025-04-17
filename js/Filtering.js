import { todos, createTodoElement } from "../script.js";

const list = document.getElementById("list");
const statusFilter = document.getElementById("statusFilter");
const sortFilter = document.getElementById("sortFilter");

function renderTodos(todos) {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const { itemEl } = createTodoElement(todo);
    list.append(itemEl);
  });
}

function filterTodos(allTodos, statusCriteria, sortCriteria) {
  let filteredTodos = allTodos;

  if (statusCriteria === "completed") {
    filteredTodos = filteredTodos.filter((t) => t.complete);
  } else if (statusCriteria === "notCompleted") {
    filteredTodos = filteredTodos.filter((t) => !t.complete);
  }

  if (sortCriteria === "created") {
    filteredTodos.sort((a, b) => a.id - b.id);
  } else if (sortCriteria === "due") {
    filteredTodos.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  return filteredTodos;
}

function handleFilterChange() {
  const statusCriteria = statusFilter.value;
  const sortCriteria = sortFilter.value;
  const allTodos = todos;
  const filtered = filterTodos(allTodos, statusCriteria, sortCriteria);
  renderTodos(filtered);
}

statusFilter.addEventListener("change", handleFilterChange);
sortFilter.addEventListener("change", handleFilterChange);

export function initializeFiltering() {
  handleFilterChange();
}
