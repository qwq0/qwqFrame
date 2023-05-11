import { createNStyle as style, NStyle } from "../src/dom/feature/NStyle.js";
import { NEvent } from "../src/dom/feature/NEvent.js";
import { tag, tagName } from "../src/dom/tool/parsingElement.js";
import { cssG, expandElement, getNElement, NList } from "../src/index.js";
import { bindValue, createHookObj } from "../src/util/proxyHook.js";



let body = getNElement(document.body);

let dataObj = createHookObj({
    text: "在子节点间插入的动态文本",
    color: "black",
    colorR: 0
});

console.log(dataObj);

let flatList = NList.flat([
    style("border", "1px black solid"),
    style("margin", "5px")
]);

let testElement_1 = NList.getElement([
    flatList,

    "--测试1--",

    [
        flatList,
        "子节点1"
    ],

    "在子节点间插入文本",

    [
        flatList,
        "子节点2"
    ],

    bindValue(dataObj, "text"),

    [
        flatList,
        "子节点3",
        style("color", bindValue(dataObj, "color"))
    ],

    bindValue(dataObj, "text"),


    [
        flatList,
        "子节点4",
        style("color", bindValue(dataObj, "colorR", o => `rgb(${o}, 0, 0)`))
    ],

    [
        flatList,
        "子节点5"
    ]
]);


let count = 0;
setInterval(() =>
{
    // for (let i = 0; i < 100; i++)
    // {
    //     let hookInfo = bindValue(dataObj, "text");
    //     hookInfo.bindToValue(window["test" + i] = body.addText(""), "data");
    //     // finalizationRegistry.register(window["test" + i], "window.test" + i);
    //     window["test" + i].remove();
    //     window["test" + i] = null;
    // }

    for (let i = 0; i < 3; i++)
    {
        let element = null;
        body.addChild(element = NList.getElement([
            "" + (++count),
            bindValue(dataObj, "text"),
            style("color", bindValue(dataObj, "color"))
        ]));
        element.remove();
        element = null;
    }
}, 160);

setInterval(() => { dataObj.text += "-"; }, 500);
setInterval(() => { dataObj.color = (dataObj.color == "black" ? "red" : "black"); }, 450);
setInterval(() => { dataObj.colorR = (dataObj.colorR + 10) % 256; }, 100);

let testElement_2 = expandElement({
    text: "--测试2--",
    style: {
    }
});

let testElement_3 = tag`
    --测试3--
    ${new NStyle("color", "red")}

    ${tag`
        子节点1
        ${new NStyle("color", "black")}
    `}

    ${tag`
        子节点2
        ${new NEvent("click", () => console.log("onclick"))}
    `}

    在两个子节点间添加文字

    ${tag`
        子节点3
        ${tagName("video")`
        `}
    `}
`;

body.addChild(testElement_1);
body.addChild(testElement_2);
body.addChild(testElement_3);