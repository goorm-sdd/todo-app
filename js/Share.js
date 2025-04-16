import {todos} from "../script.js";

//배열 text만 가져오기
const textList = todos.map((item, id) => `${id + 1}. ${item.text}`).join('\n');


//share-btn 클릭 시 복사 및 완료 알림
    document.getElementById("share-btn").addEventListener("click", () => {
        navigator.clipboard.writeText(textList).then(() => {
            alert("할 일 목록이 복사되었습니다!");
        })
    });