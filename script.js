'use strict'
// 1行目に記載している 'use strict' は削除しないでください

// 全てのdiv要素のx,yとcolorをリスト化
function getDivInfo(document) {
    const divAll = document.getElementsByTagName("div");
    const divInfoList = [];
    let rect = {};
    for (const element of divAll) {
        if (element.style.backgroundColor !== "") {
            rect = element.getBoundingClientRect();
            divInfoList.push({x1: rect.x, x2: rect.x + rect.width,
                        y1: rect.y, y2: rect.y + rect.height,
                        color: element.style.backgroundColor});
        }
    }
    return divInfoList;
}

// 増えたパネルに使える色を探索する
function getColorListArray(colors, newDiv, divInfoList) {
    let rect, rectInfo, checkX, checkY;
    const colorListArray = [];
    for (const element of newDiv) {
        rect = element.getBoundingClientRect();
        element.style.fontSize = Math.floor(Math.min(rect.width, rect.height) / 2);
        element.style.lineHeight = `${rect.height}px`;
        
        rectInfo = {x1: rect.x, x2: rect.x + rect.width,
                    y1: rect.y, y2: rect.y + rect.height,
                    colorList: colors.slice()}; // <- 使える色リスト

        for (const div of divInfoList) {
            // 隣接したタイルかチェック
            checkX = (rectInfo.x1 >= div.x1 && rectInfo.x2 <= div.x2) || (rectInfo.x1 <= div.x1 && rectInfo.x2 >= div.x2);
            checkY = (rectInfo.y1 >= div.y1 && rectInfo.y2 <= div.y2) || (rectInfo.y1 <= div.y1 && rectInfo.y2 >= div.y2);

            // 隣接したタイルかチェック
            if (((rectInfo.x1 === div.x2 || rectInfo.x2 === div.x1) && checkY) ||
                    ((rectInfo.y1 === div.y2 || rectInfo.y2 === div.y1) && checkX)) {
                // 隣接したタイルの色をリストから削除
                if (rectInfo.colorList.indexOf(div.color) >= 0) {
                    rectInfo.colorList.splice(rectInfo.colorList.indexOf(div.color), 1);
                }
            }
        }
        colorListArray.push(rectInfo.colorList.slice());  // 使える色リスト格納
    }
    return colorListArray;
}

window.onload = function() {
    console.log("onload");
    const blocks = document.getElementsByClassName("block");
    const base = document.getElementsByClassName("base")[0];
    const colors = ["aqua", "springgreen", "salmon", "violet", "lemonchiffon", "gold"];
    base.style.backgroundColor = colors[0];
    const rect = base.getBoundingClientRect();
    base.style.fontSize = Math.floor(Math.min(rect.width, rect.height) / 2);
    base.style.lineHeight = `${rect.height}px`;

    // クリックイベントの登録
    base.onclick = clickInfo;
    for (let element of blocks) {
        element.onclick = clickInfo;
    }

    // divがクリックされた時のイベント
    function clickInfo(element) {
        // const block = (element.srcElement.tagName === "P") ? element.srcElement.parentNode : element.srcElement;
        const block = element.srcElement;
        const cnt = Number(block.innerText) + 1;

        if (block.children.length > 0) {
            return  // 複数選択されたときは何もせず抜ける
        }

        // 元のdiv要素の枠線を削除し、2つのdivを追加する
        block.style.border = "0px";
        block.style.backgroundColor = "";
        block.innerText = "";
        let newDiv = [];
        if ((block.clientHeight > block.clientWidth)) {
            // block.innerHTML = `<div class="on"><p class="str">${cnt}</p></div><div class="on"><p class="str">${cnt}</p></div>`;
            block.innerHTML = `<div class="on">${cnt}</div><div class="on">${cnt}</div>`;
            newDiv = block.children;
        } else {
            // block.innerHTML = `<div class="flex"><div class="block"><p class="str">${cnt}</p></div><div class="block"><p class="str">${cnt}</p></div>`
            block.innerHTML = `<div class="flex"><div class="block">${cnt}</div><div class="block">${cnt}</div>`
            newDiv = block.children[0].children;
        }

        // 全てのdiv要素のx,yとcolorをリスト化
        const divInfoList = getDivInfo(document);
        // console.log(divInfoList);

        // 増えたパネルに使える色を探索する
        const colorListArray = getColorListArray(colors, newDiv, divInfoList);
        // console.log(colorListArray);

        // 増えたパネルの背景色の設定
        // const len1 = infoList[0].length;
        const len2 = colorListArray[1].length;
        if (len2 === 1) {
            newDiv[1].style.backgroundColor = colorListArray[1][0];
            colorListArray[0].splice(colorListArray[0].indexOf(colorListArray[1][0]), 1);
            newDiv[0].style.backgroundColor = colorListArray[0][0];
        } else {
            newDiv[0].style.backgroundColor = colorListArray[0][0];
            colorListArray[1].splice(colorListArray[1].indexOf(colorListArray[0][0]), 1);
            newDiv[1].style.backgroundColor = colorListArray[1][0];
        }
        console.log(block.clientHeight, block.clientWidth, 
            newDiv[0].style.backgroundColor, newDiv[1].style.backgroundColor);
    }
};
