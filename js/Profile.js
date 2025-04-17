const list = document.getElementById("todo-list");
const statusFilter = document.getElementById("statusFilter");
const sortFilter = document.getElementById("sortFilter");

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

// 필터링을 기존 페이지와 같게 수정 했습니당~~

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
  const allTodos = loadTodos();
  const filtered = filterTodos(allTodos, statusCriteria, sortCriteria);
  renderTodos(filtered);
}

statusFilter.addEventListener("change", handleFilterChange);
sortFilter.addEventListener("change", handleFilterChange);

window.addEventListener("DOMContentLoaded", () => {
  handleFilterChange();
});
