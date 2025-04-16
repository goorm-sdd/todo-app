let currentYear, currentMonth;
let selectedTd = null;
let selectedDateStr = null;

document.addEventListener("DOMContentLoaded", () => {
    const today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth();
    drawCalendar(currentYear, currentMonth);

    document.getElementById("prev-month").addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        drawCalendar(currentYear, currentMonth);
    });

    document.getElementById("next-month").addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        drawCalendar(currentYear, currentMonth);
    });
});

function updateTodoTitle(dateStr) {
    const [year, month, day] = dateStr.split("-");
    const titleEl = document.getElementById("todo-list-title");
    titleEl.innerText = `${year}년 ${parseInt(month)}월 ${parseInt(day)}일 할일 목록`;
}

function createDateCell(year, month, day) {
    const td = document.createElement("td");
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    td.innerText = day;
    td.dataset.date = dateStr;

    td.addEventListener("click", () => {
        console.log("클릭한 날짜:", dateStr);
        highlightSelectedDate(td);
        updateTodoTitle(dateStr);

        const allTodos = loadTodos();
        const criteria = filter.value;
        const filtered = filterTodos(allTodos, criteria).filter(t => t.date === dateStr);
        renderTodos(filtered);
    });

    return td;
}

function drawCalendar(year, month) {
    const container = document.getElementById("calendar-container");
    const title = document.getElementById("calendar-title");

    title.innerText = `${year}년 ${month + 1}월`;
    container.innerHTML = "";

    const table = document.createElement("table");
    table.classList.add("calendar-table");

    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    days.forEach(day => {
        const th = document.createElement("th");
        th.innerText = day;
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    let dayCounter = 1;

    let row = document.createElement("tr");
    for (let i = 0; i < 7; i++) {
        if (i < firstDay) {
            const td = document.createElement("td");
            td.innerText = "";
            row.appendChild(td);
        } else {
            row.appendChild(createDateCell(year, month, dayCounter++));
        }
    }
    tbody.appendChild(row);

    while (dayCounter <= lastDate) {
        row = document.createElement("tr");
        for (let i = 0; i < 7; i++) {
            if (dayCounter <= lastDate) {
                row.appendChild(createDateCell(year, month, dayCounter++));
            } else {
                const td = document.createElement("td");
                td.innerText = "";
                row.appendChild(td);
            }
        }
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    container.appendChild(table);

    const today = new Date();
    const todayStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const todayCell = container.querySelector(`td[data-date="${todayStr}"]`);

    if (todayCell) {
        highlightSelectedDate(todayCell);
        updateTodoTitle(todayStr);
        selectedDateStr = todayStr;

        const allTodos = loadTodos();
        const criteria = filter.value;
        const filtered = filterTodos(allTodos, criteria).filter(t => t.date === todayStr);
        renderTodos(filtered);
    }
}

function highlightSelectedDate(td) {
    if (selectedTd) {
        selectedTd.classList.remove("selected-date");
    }
    td.classList.add("selected-date");
    selectedTd = td;
    selectedDateStr = td.dataset.date;
}


//특정일자 할일 목록 보여주기
const list = document.getElementById("date-todo-list");
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
    const date = selectedDateStr || formatDate(new Date());
    const filtered = filterTodos(allTodos, criteria).filter(t => t.date === date);

    renderTodos(filtered);
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

filter.addEventListener("change", handleFilterChange);

window.addEventListener("DOMContentLoaded", () => {
    handleFilterChange();
});