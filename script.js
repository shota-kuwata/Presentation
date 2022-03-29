'use strict'
// 1行目に記載している 'use strict' は削除しないでください

window.onload = function() {
    console.log("onload");
    let btn1;
    const iframe1 = document.getElementById("iframe1");


    
    function loadStartWindow() {
        iframe1.src = "./start.html";
        console.log("click");
    }

    function loadGameWindow() {
        iframe1.src = "./game.html";
        console.log("click");
    }
};
