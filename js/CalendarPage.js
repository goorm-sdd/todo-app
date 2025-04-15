document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("calendar-container");

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0-based

    drawCalendar(container, currentYear, currentMonth);
});

function drawCalendar(container, year, month) {
    container.innerHTML = "";

    const title = document.createElement("h3");
    title.innerText = `${year}년 ${month + 1}월`;
    container.appendChild(title);

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

    let row = document.createElement("tr");
    let dayCounter = 1;

    for (let i = 0; i < 7; i++) {
        const td = document.createElement("td");
        if (i < firstDay) {
            td.innerText = "";
        } else {
            td.innerText = dayCounter++;
        }
        row.appendChild(td);
    }
    tbody.appendChild(row);

    while (dayCounter <= lastDate) {
        const row = document.createElement("tr");
        for (let i = 0; i < 7; i++) {
            const td = document.createElement("td");
            if (dayCounter <= lastDate) {
                td.innerText = dayCounter++;
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
