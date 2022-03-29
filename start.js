'use strict'
// 1行目に記載している 'use strict' は削除しないでください

window.onload = function() {
  console.log("start.js");
  let btn1 = document.getElementById("btn1");
  btn1.onclick = btn1Click;
  
  function btn1Click() {
    console.log("click");
    document.parent.loadGameWindow();
  }
}
