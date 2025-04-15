
const list = document.getElementById("todo-list");
const filter = document.getElementById("filter");

function loadTodos() {
  const data = localStorage.getItem("my_todos");
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("파싱 오류", e);
    return [];
  }
}

function renderTodos(todos) {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const div = document.createElement("div");
    div.classList.add("todo-item");

    if (todo.complete) {
      div.classList.add("complete");
    }

    div.textContent = todo.text || "(내용 없음)";
    list.appendChild(div);
  });
}

function filterTodos(allTodos, criteria) {
  if (criteria === "completed") {
    return allTodos.filter((t) => t.complete);
  } else if (criteria === "pending") {
    return allTodos.filter((t) => !t.complete);
  } else {
    return allTodos;
  }
}

function handleFilterChange() {
  const criteria = filter.value;
  const allTodos = loadTodos();
  const filtered = filterTodos(allTodos, criteria);
  renderTodos(filtered);
}

filter.addEventListener("change", handleFilterChange);

window.addEventListener("DOMContentLoaded", () => {
  handleFilterChange(); 
});