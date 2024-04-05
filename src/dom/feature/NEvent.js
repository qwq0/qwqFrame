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
     * @type {(event: HTMLElementEventMap[T], currentElement: import("../node/NElement").NElement) => void}
     */
    callback = null;

    /**
     * @param {T} key
     * @param {(event: HTMLElementEventMap[T], currentElement: import("../node/NElement").NElement) => void} callback
     */
    constructor(key, callback)
    {
        this.eventName = key;
        this.callback = callback;
    }

    /**
     * 将此特征应用于元素
     * @param {import("../node/NElement").NElement} element
     */
    apply(element)
    {
        element.addEventListener(this.eventName, event =>
        {
            this.callback(event, element);
        });
    }
}

/**
 * 快速创建 NEvent 实例
 * @type {{
 *  [x in keyof HTMLElementEventMap]?: (callback: (event: HTMLElementEventMap[x], currentElement: import("../node/NElement").NElement) => void) => NEvent<x>
 * }}
 */
export let eventName = new Proxy({}, {
    get: (_target, key) =>
    {
        return (/** @type {(event: Event , currentElement: import("../node/NElement").NElement<any>) => void} */ callback) =>
        {
            // @ts-ignore
            return new NEvent(key, callback);
        };
    },
    set: () => false
});