import { createNStyle, NStyle } from "../src/dom/feature/NStyle.js";
import { NEvent } from "../src/dom/feature/NEvent.js";
import { tag, tagName } from "../src/dom/tool/parsingElement.js";
import { cssG, expandElement, getNElement, NList } from "../src/index.js";

let body = getNElement(document.body);

let testElement_1 = tag`
    测试
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

let testElement_2 = NList.getElement([
    createNStyle("accentColors", ""),
    createNStyle("a", ""),
    createNStyle("", "")
]);
let testElement_3 = expandElement({
    style: {
        "color": cssG.rgb(255, 255, 200),
        "a": ""
    }
});

body.addChild(testElement_1);
body.addChild(testElement_2);
body.addChild(testElement_3);