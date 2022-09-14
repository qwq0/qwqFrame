import { NElement } from "../../../dist/qwqframe.js";

/**
 * 属性
 * @template {(keyof HTMLElement) | string} T
 */
export class NAttr
{
    /**
     * @type {T}
     */
    key = null;
    /**
     * 若为函数则应用时调用
     * 若有返回值则赋值到属性
     * @type {string | number | function(any): any}
     */
    value = null;

    /**
     * @param {T} key
     * @param {string | number | function(any): any} value
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
        if (typeof (this.value) == "function")
        {
            let cbRet = this.value(e.element[this.key]);
            if (cbRet != undefined)
                e.element[this.key] = cbRet;
        }
        else
            e.element[this.key] = this.value;
    }
}