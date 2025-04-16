let currentYear, currentMonth;

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

    // 첫 줄
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
        row = document.createElement("tr");
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
