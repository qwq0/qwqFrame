import { unboundHook as unboundHookSet } from "../../../debug/unboundHookSet.js";
import { freeHookBindDestroy, hookBindDestroy } from "../shareHookStatus.js";

/**
 * 数组钩子绑定类
 * 
 * @typedef {{
 *  set: (index: number, value: any) => void,
 *  add: (index: number, value: any) => void,
 *  del: (index: number) => void
 * }} callbackType
 */
export class ArrayHookBind
{
    /**
     * 代理数组
     * @type {Array}
     */
    #proxyArr = null;

    /**
     * 修改数组时需要触发的钩子
     * 此值为 hookStatus 文件中 arrayProxyMap 的 hookSet 的引用
     * @type {Set<ArrayHookBind>}
     */
    #hookSet = null;

    /**
     * 回调函数的弱引用
     * @type {WeakRef<callbackType>}
     */
    #cbRef = null;

    /**
     * 回调函数
     * 当此钩子绑定自动释放时为null
     * @type {callbackType}
     */
    #callback = null;

    /**
     * 目标对象引用映射
     * 用于建立目标对象到指定对象的强引用关系
     * @type {WeakMap<object, Set<object>>}
     */
    #targetRefMap = new WeakMap();

    /**
     * @param {Array} proxyArr
     * @param {Set<ArrayHookBind>} hookSet
     * @param {callbackType} callback
     */
    constructor(proxyArr, hookSet, callback)
    {
        this.#proxyArr = proxyArr;
        this.#hookSet = hookSet;
        this.#cbRef = new WeakRef(callback);
        this.#callback = callback;

        // 添加调试未绑定探针
        unboundHookSet.add(this);
    }

    /**
     * 触发此钩子 (设置)
     * @param {number} index
     * @param {any} value
     */
    emitSet(index, value)
    {
        let callback = this.#cbRef.deref();
        if (callback)
        {
            try
            {
                callback.set(index, value);
            }
            catch (err)
            {
                console.error(err);
            }
        }
    }

    /**
     * 触发此钩子 (增加)
     * @param {number} index
     * @param {any} value
     */
    emitAdd(index, value)
    {
        let callback = this.#cbRef.deref();
        if (callback)
        {
            try
            {
                callback.add(index, value);
            }
            catch (err)
            {
                console.error(err);
            }
        }
    }

    /**
     * 触发此钩子 (删除)
     * @param {number} index
     */
    emitDel(index)
    {
        let callback = this.#cbRef.deref();
        if (callback)
        {
            try
            {
                callback.del(index);
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
        this.#hookSet.delete(this);
        freeHookBindDestroy(this);

        // 移除调试未绑定探针
        unboundHookSet.delete(this);
    }

    /**
     * 绑定销毁
     * 当目标对象释放时销毁
     * @param {object} targetObj
     * @returns {ArrayHookBind} 返回自身
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
        unboundHookSet.delete(this);

        return this;
    }
}