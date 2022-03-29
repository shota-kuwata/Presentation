'use strict'
// 1行目に記載している 'use strict' は削除しないでください

window.onload = function() {
    console.log("onload");
    let btn1;
    const iframe1 = document.getElementById("iframe1");

    console.log(iframe1.contentWindow.document)
    if (iframe1.contentWindow.document.title === "スタート画面") {
        console.log("スタート画面")
        btn1 = iframe1.contentWindow.document.querySelector(".btn1");
        btn1.onclick = btn1Click;
    }


    

    function btn1Click() {
        iframe1.src = "./game.html";
        console.log("click");
    }
};
