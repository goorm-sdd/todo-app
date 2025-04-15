export function setupCalendarFeature(item, calendarBtnEl, actionsEl, saveToLocalStorage) {
    const dateInputEl = document.createElement("input");
    dateInputEl.type = "date";
    dateInputEl.style.display = "none";
    dateInputEl.value = item.date || "";

    calendarBtnEl.addEventListener("click", () => {
        dateInputEl.style.display = "inline";
        dateInputEl.focus();
    });

    dateInputEl.addEventListener("change", () => {
        item.date = dateInputEl.value;
        saveToLocalStorage();
    });

    actionsEl.append(dateInputEl);
}
