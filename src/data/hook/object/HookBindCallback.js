import { unboundHook } from "../../../debug/unboundHookSet.js";
import { freeHookBindDestroy, hookBindDestroy } from "../shareHookStatus.js";

/**
 * 钩子绑定到回调类
 */
export class HookBindCallback
{
    /**
     * 钩子信息
     * @type {import("./HookBindInfo").HookBindInfo}
     */
    #info = null;

    /**
     * 回调函数的弱引用
     * @type {WeakRef<function(any): void>}
     */
    #cbRef = null;
    /**
     * 回调函数
     * 当此钩子绑定自动释放时为null
     * @type {function(any): void}
     */
    #callback = null;

    /**
     * 目标对象引用映射
     * 用于建立目标对象到指定对象的强引用关系
     * @type {WeakMap<object, Set<object>>}
     */
    #targetRefMap = new WeakMap();

    /**
     * @param {import("./HookBindInfo").HookBindInfo} info
     * @param {function(any): void} callback
     */
    constructor(info, callback)
    {
        this.#info = info;
        this.#cbRef = new WeakRef(callback);
        this.#callback = callback;
        info.addHook(this);

        // 添加调试未绑定探针
        unboundHook.add(this);
    }

    /**
     * 触发此钩子
     */
    emit()
    {
        let callback = this.#cbRef.deref();
        if (callback)
        {
            try
            {
                callback(this.#info.getValue());
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

        // 移除调试未绑定探针
        unboundHook.delete(this);
    }

    /**
     * 绑定销毁
     * 当目标对象释放时销毁
     * @param {object} targetObj
     * @returns {HookBindCallback} 返回自身
     */
    bindDestroy(targetObj)
    {
        let targetRefSet = this.#targetRefMap.get(targetObj);
        if (targetRefSet == undefined)
        {
            targetRefSet = new Set();
            this.#targetRefMap.set(targetObj, targetRefSet);
        }
        targetRefSet.add(this.#callback);
        this.#callback = null;
        hookBindDestroy(targetObj, this);

        // 移除调试未绑定探针
        unboundHook.delete(this);

        return this;
    }
}