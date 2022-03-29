'use strict'
// 1行目に記載している 'use strict' は削除しないでください

window.onload = function() {
    console.log("script.js");
    const iframe1 = document.getElementById("iframe1");
    console.log(iframe1);
    iframe1.contentWindow.pageInit();

    
    function loadStartWindow() {
        iframe1.src = "./start.html";
        console.log("loadStartWindow");
    }

    function loadGameWindow() {
        iframe1.src = "./game.html";
        console.log("loadGameWindow");
    }
};
