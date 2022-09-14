import { NStyle } from "../src/dom/feature/NStyle.js";
import { NEvent } from "../src/dom/feature/NEvent.js";
import { tag, tagName } from "../src/dom/tool/parsingElement.js";
import { getNElement } from "../src/index.js";

var body = getNElement(document.body);

var testElement = tag`
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

body.addChild(testElement);