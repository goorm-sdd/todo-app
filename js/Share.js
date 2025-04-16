import {todos} from "../script.js";

//share-btn 클릭 시 복사 및 완료 알림 (todos가 비어있을 시 복사하지 않음)

document.getElementById("share-btn").addEventListener("click", () => {
    const textList = todos.filter(item => item.text.trim() !== "")
        .map((item, id) => `${id + 1}. ${item.text}`);
    
    if (textList.length > 0) {
        const joinedText = textList.join('\n');
        navigator.clipboard.writeText(joinedText).then(() => {
            alert("할 일 목록이 복사되었습니다!");
        })
    } else {
        alert("복사할 할 일 목록이 없습니다.");
    }
})