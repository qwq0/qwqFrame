/**
 * 事件
 * @template {keyof HTMLElementEventMap} T
 */
export class NEvent
{
    /**
     * @type {T}
     */
    key = null;
    /**
     * @type {function(Event) : void}
     */
    callback = null;

    /**
     * @param {T} key
     * @param {function(Event) : void} callback
     */
    constructor(key, callback)
    {
        this.key = key;
        this.callback = callback;
    }
}