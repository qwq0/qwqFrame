import { NElement } from "../../../dist/qwqframe.js";

/**
 * 事件
 * @template {keyof HTMLElementEventMap} T
 */
export class NEvent
{
    /**
     * @type {T}
     */
    eventName = null;
    /**
     * @type {function(HTMLElementEventMap[T]): any}
     */
    callback = null;

    /**
     * @param {T} key
     * @param {function(HTMLElementEventMap[T]): any} callback
     */
    constructor(key, callback)
    {
        this.eventName = key;
        this.callback = callback;
    }

    /**
     * 将此特征应用于元素
     * @param {NElement} e
     */
    apply(e)
    {
        e.addEventListener(this.eventName, this.callback);
    }
}