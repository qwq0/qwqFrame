import { NElement } from "../../../dist/qwqframe.js";

/**
 * 样式
 * @template {keyof CSSStyleDeclaration} T
 */
export class NStyle
{
    /**
     * @type {T}
     */
    key = null;
    /**
     * @type {CSSStyleDeclaration[T]}
     */
    value = null;

    /**
     * @param {T} key
     * @param {CSSStyleDeclaration[T]} value
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