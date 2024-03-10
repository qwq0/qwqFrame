import { freeHookBindDestroy, hookBindDestroy } from "../shareHookStatus.js";

/**
 * 钩子绑定到值类
 */
export class HookBindValue
{
    /**
     * 钩子信息
     * @type {import("./HookBindInfo").HookBindInfo}
     */
    #info = null;

    /**
     * 目标对象
     * @type {WeakRef<object>}
     */
    #targetRef = null;
    /**
     * 目标对象的键
     * @type {string | symbol}
     */
    #targetKey = "";

    /**
     * @param {import("./HookBindInfo").HookBindInfo} info
     * @param {object} targetObj
     * @param {string | symbol} targetKey
     */
    constructor(info, targetObj, targetKey)
    {
        this.#info = info;
        this.#targetRef = new WeakRef(targetObj);
        this.#targetKey = targetKey;
        info.addHook(this);
        hookBindDestroy(targetObj, this);
    }

    /**
     * 触发此钩子
     * 销毁后仍可通过此方法手动触发
     */
    emit()
    {
        let target = this.#targetRef.deref();
        if (target != undefined)
        {
            try
            {
                target[this.#targetKey] = this.#info.getValue();
            }
            catch (err)
            {
                console.error(err);
            }
        }
    }

    /**
     * 销毁此钩子
     * 销毁后钩子将不再自动触发
     */
    destroy()
    {
        this.#info.removeHook(this);
        freeHookBindDestroy(this);
    }
}