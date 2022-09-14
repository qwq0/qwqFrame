import { NElement } from "../../../dist/qwqframe.js";

/**
 * 流水线
 */
export class NAsse
{
    /**
     * @type {function(NElement): void}
     */
    callback = null;

    /**
     * @param {function(NElement): void} callback
     */
    constructor(callback)
    {
        this.callback = callback;
    }

    /**
     * 将此特征应用于元素
     * @param {NElement} e
     */
    apply(e)
    {
        this.callback(e);
    }
}