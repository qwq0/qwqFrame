import { NElement } from "../element/NElement.js";

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
     * @type {string}
     */
    value = null;

    /**
     * @param {T} key
     * @param {string} value
     */
    constructor(key, value)
    {
        this.key = key;
        this.value = value;
    }

    /**
     * 将此特征应用于元素
     * @param {NElement} e
     */
    apply(e)
    {
        e.setStyle(this.key, /** @type {string | number} */(this.value));
    }
}

/**
 * 创建NStyle 省略new
 * @param {keyOfStyle} key
 * @param {string} value
 */
export function createNStyle(key, value)
{
    return new NStyle(key, value);
}

createNStyle("asd", "");