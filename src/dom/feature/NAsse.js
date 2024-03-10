/**
 * 流水线
 */
export class NAsse
{
    /**
     * @type {function(import("../node/NElement").NElement): void}
     */
    callback = null;

    /**
     * @param {function(import("../node/NElement").NElement): void} callback
     */
    constructor(callback)
    {
        this.callback = callback;
    }

    /**
     * 将此特征应用于元素
     * @param {import("../node/NElement").NElement} e
     */
    apply(e)
    {
        this.callback(e);
    }
}