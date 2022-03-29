'use strict'
// 1行目に記載している 'use strict' は削除しないでください

pageInit() {
  console.log("start.js");
  console.log("2");
  console.log(window);
  let btn1 = window.document.getElementById("btn1");
  btn1.onclick = btn1Click;
  
  function btn1Click() {
    console.log("click");
    window.parent.loadGameWindow();
  }
}
