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
     * @type {(event: HTMLElementEventMap[T], currentElement: import("../element/NElement").NElement) => void}
     */
    callback = null;

    /**
     * @param {T} key
     * @param {(event: HTMLElementEventMap[T], currentElement: import("../element/NElement").NElement) => void} callback
     */
    constructor(key, callback)
    {
        this.eventName = key;
        this.callback = callback;
    }

    /**
     * 将此特征应用于元素
     * @param {import("../element/NElement").NElement} element
     */
    apply(element)
    {
        element.addEventListener(this.eventName, event =>
        {
            this.callback(event, element);
        });
    }
}