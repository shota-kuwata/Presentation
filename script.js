'use strict'
// 1行目に記載している 'use strict' は削除しないでください

window.onload = function() {
    console.log("onload");
    const blocks = document.getElementsByClassName("block");
    const bases = document.getElementsByClassName("base");
    const colors = ["aqua", "greenyellow", "lightsalmon", "lightgoldenrodyellow", "mediumpurple"];
    let i = 0;
    bases[0].style.backgroundColor = colors[0]

    for (let element of bases) {
        element.onclick = clickInfo;
    }
    for (let element of blocks) {
        element.onclick = clickInfo;
    }

    // divがクリックされた時のイベント
    function clickInfo(element) {
        const block = (element.srcElement.tagName === "P") ? 
            element.srcElement.parentNode : element.srcElement;
        const cnt = Number(block.children[0].innerText) + 1;
        if (block.children[0].tagName !== "P") {
            return  // 複数選択されたときは何もせず抜ける
        }

        // 元のdiv要素の枠線を削除し、2つのdivを追加する
        block.style.border = "0px";
        let child = [];
        if ((block.clientHeight > block.clientWidth)) {
            block.innerHTML = `<div class="on"><p class="str">${cnt}</p></div><div class="on"><p class="str">${cnt}</p></div>`;
            child = block.children;
        } else {
            block.innerHTML = `<div class="flex"><div class="block"><p class="str">${cnt}</p></div><div class="block"><p class="str">${cnt}</p></div>`
            child = block.children[0].children;
        }

        // 全てのdiv要素のx,yとcolorをリスト化
        const all = document.getElementsByTagName("div");
        const list = [];
        let rect = {};
        for (const element of all) {
            if (element.children[0] && element.children[0].tagName === "P") {
                rect = element.getBoundingClientRect();
                list.push({x1: rect.x, x2: rect.x + rect.width,
                            y1: rect.y, y2: rect.y + rect.height,
                            color: element.style.backgroundColor});
            }
        }
        // console.log(list)
        
        // 新しく作ったdiv要素のリスト
        let rectInfo = {};
        let checkX, checkY;
        const infoList = [];
        for (const element of child) {
            rect = element.getBoundingClientRect();
            element.style.fontSize = Math.min(rect.width, rect.height) / 2;
            rectInfo = {x1: rect.x, x2: rect.x + rect.width,
                        y1: rect.y, y2: rect.y + rect.height,
                        colorList: colors.slice()};

            for (const div of list) {
                // 隣接したセルかチェック
                checkX = (rectInfo.x1 >= div.x1 && rectInfo.x2 <= div.x2) ||
                (rectInfo.x1 <= div.x1 && rectInfo.x2 >= div.x2);
                checkY = (rectInfo.y1 >= div.y1 && rectInfo.y2 <= div.y2) ||
                        (rectInfo.y1 <= div.y1 && rectInfo.y2 >= div.y2);

                if (((rectInfo.x1 === div.x2 || rectInfo.x2 === div.x1) && checkY) ||
                        ((rectInfo.y1 === div.y2 || rectInfo.y2 === div.y1) && checkX) &&
                        (div.color !== "")) {
                    // 隣接した色をリストから削除
                    if (rectInfo.colorList.indexOf(div.color) >= 0) {
                        rectInfo.colorList.splice(rectInfo.colorList.indexOf(div.color), 1);
                    }
                }
            }
            infoList.push(rectInfo.colorList.slice());  // 使える色リスト
        }
        const len1 = infoList[0].length;
        const len2 = infoList[1].length;
        if (len1 === 1) {
            child[0].style.backgroundColor = infoList[0][0];
            infoList[1].splice(infoList[1].indexOf(infoList[0][0]), 1);
            child[1].style.backgroundColor = infoList[1][0];
        } else {
            child[1].style.backgroundColor = infoList[1][0];
            infoList[0].splice(infoList[0].indexOf(infoList[1][0]), 1);
            child[0].style.backgroundColor = infoList[0][0];
        }
    }
};
