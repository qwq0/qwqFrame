import { HookBindInfo } from "../../data/hook/object/HookBindInfo.js";
import { NList } from "./NList.js";

/**
 * @typedef {(keyof CSSStyleDeclaration & string) | (string & {})} keyOfStyle
 */
/**
 * 样式
 * @template {keyOfStyle} T
 */
export class NStyle
{
    /**
     * @type {T}
     */
    key = null;
    /**
     * @type {string | HookBindInfo}
     */
    value = null;

    /**
     * @param {T} key
     * @param {string | HookBindInfo} value
     */
    constructor(key, value)
    {
        this.key = key;
        this.value = value;
    }

    /**
     * 将此特征应用于元素
     * @param {import("../node/NElement.js").NElement} e
     */
    apply(e)
    {
        e.setStyle(this.key, this.value);
    }
}

/**
 * 创建NStyle 省略new
 * @param {keyOfStyle} key
 * @param {string | HookBindInfo} value
 */
export function createNStyle(key, value)
{
    return new NStyle(key, value);
}

/**
 * 创建一组NStyle的flat NList
 * @param {{ [x in keyOfStyle]?: string | HookBindInfo }} obj
 */
export function createNStyleList(obj)
{
    return NList.flat(Object.keys(obj).map(key => new NStyle(key, obj[key])));
}