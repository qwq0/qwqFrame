// dom

export { NElement, getNElement } from "./dom/node/NElement.js";
export { NLocate } from "./dom/node/NLocate.js";
export { NText } from "./dom/node/NText.js";

export { NAsse } from "./dom/feature/NAsse.js";
export { NAttr } from "./dom/feature/NAttr.js";
export { NEvent, eventName } from "./dom/feature/NEvent.js";
export { NStyle, createNStyle, createNStyleList, createNStyleList as styles } from "./dom/feature/NStyle.js";
export { NTagName, nTagName } from "./dom/feature/NTagName.js";
export { NList } from "./dom/feature/NList.js";

export { cssG } from "./dom/style/cssGen.js";

// dom tools

export { bindAttribute } from "./dom/tool/asse/bindAttribute.js";
export { classNames } from "./dom/tool/asse/classNames.js";

export { buildList } from "./dom/tool/builder/buildList.js";

export { expandElement } from "./dom/tool/old/expandElement.js";
export { divideLayout_LR, divideLayout_UD, divideLayout_RL, divideLayout_DU } from "./dom/tool/layout/divideLayout.js";
export { tag, tagName } from "./dom/tool/old/parsingElement.js";

export { mouseBind } from "./dom/tool/event/mouse.js";
export { touchBind } from "./dom/tool/event/touch.js";
export { keyboardBind } from "./dom/tool/event/keyboard.js";

// flow

export { runOnce } from "./flow/runOnce.js";

// data

export { createHookObj, bindValue } from "./data/hook/object/proxyObject.js";
export { createHookArray, bindArrayHook } from "./data/hook/array/proxyArray.js";
export { createHookMap, bindMapHook } from "./data/hook/map/proxyMap.js";
export { createHookSet, bindSetHook } from "./data/hook/set/proxySet.js";

// util

export { delayPromise, delayPromiseWithReject, delayPromiseWithResolve } from "./util/delayPromise.js";
export { EventHandler } from "./util/EventHandler.js";
export { isAmong } from "./util/forEach.js";
export { uniqueIdentifierString } from "./util/uniqueIdentifier.js";

// types

/**
 * @typedef {import("./dom/feature/NList.js").NList_list} NList_list
 * @typedef {import("./dom/feature/NList.js").NList_list} NList_item
 * @typedef {import("./dom/tool/event/PointerData.js").PointerData} PointerData
 * @typedef {import("./dom/tool/event/KeyboardData.js").KeyboardData} KeyboardData
 */