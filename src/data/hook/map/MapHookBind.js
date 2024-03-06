import { unboundHook as unboundHookSet } from "../../../debug/unboundHookSet.js";
import { register, targetRefMap } from "./hookStatus.js";

/**
 * Map钩子绑定类
 * 
 * @typedef {{
 *  add: (key: any, value: any) => void,
 *  set: (key: any, value: any) => void,
 *  del: (key: any) => void
 * }} callbackType
 */
export class MapHookBind
{
    /**
     * 代理Map
     * @type {Map}
     */
    #proxyMap = null;

    /**
     * 修改数组时需要触发的钩子
     * 此值为 hookStatus 文件中 mapProxyMap 的 hookSet 的引用
     * @type {Set<MapHookBind>}
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
     * @param {Map} proxyMap
     * @param {Set<MapHookBind>} hookSet
     * @param {callbackType} callback
     */
    constructor(proxyMap, hookSet, callback)
    {
        this.#proxyMap = proxyMap;
        this.#hookSet = hookSet;
        this.#cbRef = new WeakRef(callback);
        this.#callback = callback;

        // 添加调试未绑定探针
        unboundHookSet.add(this);
    }

    /**
     * 触发此钩子 (增加)
     * @param {any} key
     * @param {any} value
     */
    emitAdd(key, value)
    {
        let callback = this.#cbRef.deref();
        if (callback)
        {
            try
            {
                callback.add(key, value);
            }
            catch (err)
            {
                console.error(err);
            }
        }

    }

    /**
     * 触发此钩子 (设置)
     * @param {any} key
     * @param {any} value
     */
    emitSet(key, value)
    {
        let callback = this.#cbRef.deref();
        if (callback)
        {
            try
            {
                callback.set(key, value);
            }
            catch (err)
            {
                console.error(err);
            }
        }
    }

    /**
     * 触发此钩子 (删除)
     * @param {any} key
     */
    emitDel(key)
    {
        let callback = this.#cbRef.deref();
        if (callback)
        {
            try
            {
                callback.del(key);
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
        register.unregister(this);

        // 移除调试未绑定探针
        unboundHookSet.delete(this);
    }

    /**
     * 绑定销毁
     * 当目标对象释放时销毁
     * @param {object} targetObj
     * @returns {MapHookBind} 返回自身
     */
    bindDestroy(targetObj)
    {
        let targetRefSet = targetRefMap.get(targetObj);
        if (targetRefSet == undefined)
        {
            targetRefSet = new Set();
            targetRefMap.set(targetObj, targetRefSet);
        }
        targetRefSet.add(this.#callback);
        this.#callback = null;
        register.register(targetObj, this, this);

        // 移除调试未绑定探针
        unboundHookSet.delete(this);

        return this;
    }
}