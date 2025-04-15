export function setupCalendarFeature(item, calendarBtnEl, actionsEl, saveToLocalStorage) {
    const dateInputEl = document.createElement("input");
    dateInputEl.type = "date";
    dateInputEl.value = item.date || "";
    dateInputEl.style.display = "inline";
    dateInputEl.disabled = true; // 처음엔 비활성화 상태로 시작

    let isEditing = false;

    calendarBtnEl.addEventListener("click", () => {
        if (!isEditing) {
            // 수정 가능 상태로 전환
            dateInputEl.disabled = false;
            dateInputEl.focus();
            isEditing = true;
        } else {
            // 수정 불가능 상태로 전환 + 저장
            dateInputEl.disabled = true;
            item.date = dateInputEl.value;
            saveToLocalStorage();
            isEditing = false;
        }
    });

    dateInputEl.addEventListener("change", () => {
        item.date = dateInputEl.value;
        // 저장은 버튼 누를 때만
    });

    actionsEl.append(dateInputEl);
}
