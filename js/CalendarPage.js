let currentYear, currentMonth;
let selectedTd = null;

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
        const td = document.createElement("td");
        if (i < firstDay) {
            td.innerText = "";
        } else {
            td.innerText = dayCounter;

            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayCounter).padStart(2, "0")}`;
            td.dataset.date = dateStr;

            td.addEventListener("click", () => {
                console.log("클릭한 날짜:", dateStr);
                highlightSelectedDate(td);
            });

            dayCounter++;
        }
        row.appendChild(td);
    }
    tbody.appendChild(row);

    while (dayCounter <= lastDate) {
        row = document.createElement("tr");
        for (let i = 0; i < 7; i++) {
            const td = document.createElement("td");
            if (dayCounter <= lastDate) {
                td.innerText = dayCounter;

                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayCounter).padStart(2, "0")}`;
                td.dataset.date = dateStr;

                td.addEventListener("click", () => {
                    console.log("클릭한 날짜:", dateStr);
                    highlightSelectedDate(td);
                });

                dayCounter++;
            } else {
                td.innerText = "";
            }
            row.appendChild(td);
        }
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    container.appendChild(table);
}

function highlightSelectedDate(td) {
    if (selectedTd) {
        selectedTd.classList.remove("selected-date");
    }
    td.classList.add("selected-date");
    selectedTd = td;
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
    const filtered = filterTodos(allTodos, criteria);
    renderTodos(filtered);
}

filter.addEventListener("change", handleFilterChange);

window.addEventListener("DOMContentLoaded", () => {
    handleFilterChange();
});