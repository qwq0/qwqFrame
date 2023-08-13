export { cssG } from "./dom/style/cssGen.js";
export { expandElement } from "./dom/tool/expandElement.js";
export { divideLayout_LR, divideLayout_UD, divideLayout_RL, divideLayout_DU } from "./dom/tool/divideLayout.js";
export { tag, tagName } from "./dom/tool/parsingElement.js";

export { NAsse } from "./dom/feature/NAsse.js";
export { NAttr } from "./dom/feature/NAttr.js";
export { NEvent } from "./dom/feature/NEvent.js";
export { NStyle, createNStyle, createNStyleList } from "./dom/feature/NStyle.js";
export { NTagName } from "./dom/feature/NTagName.js";
export { NList } from "./dom/feature/NList.js";

export { NElement, getNElement } from "./dom/element/NElement.js";

export { mouseBind } from "./dom/event/tool/mouse.js";
export { touchBind } from "./dom/event/tool/touch.js";

export { runOnce } from "./flow/runOnce.js"

export { bindValue, createHookObj } from "./data/hook/proxyHook.js";

/**
 * @typedef {import("./dom/feature/NList.js").NList_list} NList_list
 */