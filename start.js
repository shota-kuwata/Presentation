'use strict'
// 1行目に記載している 'use strict' は削除しないでください

window.onload = function() {
  const btn1 = document.getElementById("btn1");
  const iframe1 = document.parent.getElementById("iframe1");
  btn1.onclick = btn1Click;
  
  
  
  
  function btn1Click() {
        iframe1.src = "./game.html";
        console.log("click");
  }
}
