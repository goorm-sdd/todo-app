export function setupCalendarFeature(item, calendarBtnEl, actionsEl, saveToLocalStorage) {
    const dateInputEl = document.createElement("input");
    dateInputEl.type = "date";
    dateInputEl.value = item.date || "";
    dateInputEl.style.display = "inline";
    dateInputEl.disabled = true;

    let isEditing = false;

    calendarBtnEl.addEventListener("click", () => {
        if (!isEditing) {
            dateInputEl.disabled = false;
            dateInputEl.focus();
            isEditing = true;
        } else {
            dateInputEl.disabled = true;
            item.date = dateInputEl.value;
            saveToLocalStorage();
            isEditing = false;
        }
    });

    dateInputEl.addEventListener("change", () => {
        item.date = dateInputEl.value;

    });

    actionsEl.append(dateInputEl);
}
