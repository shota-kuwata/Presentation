'use strict'
// 1行目に記載している 'use strict' は削除しないでください

// 全てのdiv要素のxy座標とbackgroundColorをリスト化
function getDivInfo(document) {
    return Array.from(document.getElementsByTagName("div"))
                .filter((element) => element.style.backgroundColor !== "")
                .map((element) => {
                    const rect = element.getBoundingClientRect();
                    return {x1: rect.x, x2: rect.x + rect.width,
                            y1: rect.y, y2: rect.y + rect.height,
                            color: element.style.backgroundColor};
                });
}

// 増えたパネルに使える色を探索する
function getColorListArray(colors, newDiv, divInfoList) {
    return Array.from(newDiv).map((element) => {
        const rect = element.getBoundingClientRect();
        element.style.fontSize = Math.floor(Math.min(rect.width, rect.height) / 2);
        element.style.lineHeight = `${rect.height}px`;
        const rectInfo = {x1: rect.x, x2: rect.x + rect.width, y1: rect.y, y2: rect.y + rect.height};
        
        // 隣接パネルで使用されている色リストを取得
        const usedColorList = Array.from(divInfoList).map((div) => {
            // XY方向の包括範囲にいるかチェック
            const checkX = (rectInfo.x1 >= div.x1 && rectInfo.x2 <= div.x2) || 
                            (rectInfo.x1 <= div.x1 && rectInfo.x2 >= div.x2);
            const checkY = (rectInfo.y1 >= div.y1 && rectInfo.y2 <= div.y2) || 
                            (rectInfo.y1 <= div.y1 && rectInfo.y2 >= div.y2);

            // 隣接したタイルかチェック
            if (((rectInfo.x1 === div.x2 || rectInfo.x2 === div.x1) && checkY) ||
                    ((rectInfo.y1 === div.y2 || rectInfo.y2 === div.y1) && checkX)) {
                return div.color;
            }
        }).filter(Boolean);

        // 使える色リストとの差分を返す
        return colors.filter((i) => usedColorList.indexOf(i) == -1)
    });
}

// 最初にページがロードされた
window.onload = function() {
    console.log("onLoad");
    const colors = ["aqua", "springgreen", "salmon", "violet", "lemonchiffon", "gold"];

    const base = document.getElementsByClassName("base")[0];
    const rect = base.getBoundingClientRect();
    base.style.fontSize = Math.floor(Math.min(rect.width, rect.height) / 2);
    base.style.lineHeight = `${rect.height}px`;
    base.style.backgroundColor = colors[0];

    // 最初の親要素にクリックイベントの登録
    base.onclick = clickInfo;

    // divがクリックされた時のイベント
    function clickInfo(element) {
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
            block.innerHTML = `<div class="on">${cnt}</div><div class="on">${cnt}</div>`;
            newDiv = block.children;
        } else {
            block.innerHTML = `<div class="flex"><div class="block">${cnt}</div><div class="block">${cnt}</div>`
            newDiv = block.children[0].children;
        }

        // 全てのdiv要素のx,yとcolorをリスト化
        const divInfoList = getDivInfo(document);

        // 増えたパネルに使える色を探索する
        const colorListArray = getColorListArray(colors, newDiv, divInfoList);

        // 増えたパネルの背景色の設定
        if (colorListArray[1].length <= 1) {
            newDiv[1].style.backgroundColor = colorListArray[1][0];
            newDiv[0].style.backgroundColor = colorListArray[0].filter((color) => color !== colorListArray[1][0])[0];
        } else {
            newDiv[0].style.backgroundColor = colorListArray[0][0];
            newDiv[1].style.backgroundColor = colorListArray[1].filter((color) => color !== colorListArray[0][0])[0];
        }
            
        console.log(block.clientHeight, block.clientWidth, 
            newDiv[0].style.backgroundColor, newDiv[1].style.backgroundColor);
    }
};

// ウィンドウサイズが変更された
window.onresize = function() {
    console.log("onResize");

    // 全div要素の文字サイズを修正する
    Array.from(document.getElementsByTagName("div"))
        .filter((element) => element.innerText !== "")
        .map((element) => {
            const rect = element.getBoundingClientRect();
            element.style.fontSize = Math.floor(Math.min(rect.width, rect.height) / 2);
            element.style.lineHeight = `${rect.height}px`;
    });
}
