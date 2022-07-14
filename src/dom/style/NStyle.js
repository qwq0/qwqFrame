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
}