import { SetHookBind } from "./SetHookBind.js";
import { setProxyMap } from "./hookStatus.js";

/**
 * 创建Set的代理
 * @template {Set} T
 * @param {T} srcSet
 * @returns {T}
 */
export function createHookSet(srcSet)
{
    /**
     * @type {Set<SetHookBind>}
     */
    let hookSet = new Set();

    /**
     * @param {any} value
     */
    function emitAdd(value)
    {
        hookSet.forEach(o => { o.emitAdd(value); });
    }

    /**
     * @param {any} value
     */
    function emitDel(value)
    {
        hookSet.forEach(o => { o.emitDel(value); });
    }

    const proxyMap = (new Proxy(srcSet, {
        get: (target, key) => // 取值
        {
            // TODO 此处构建的函数可缓存
            switch (key)
            {
                case "add":
                    return (/** @type {any} */ value) =>
                    {
                        let has = srcSet.has(value);

                        srcSet.add(value);

                        if (!has)
                            emitAdd(value);

                        return proxyMap;
                    };
                case "delete":
                    return (/** @type {any} */ key) =>
                    {
                        let has = srcSet.delete(key);

                        if (has)
                            emitDel(key);

                        return has;
                    };
                case "clear":
                    return () =>
                    {
                        let values = srcSet.values();

                        srcSet.clear();

                        for (let value of values)
                        {
                            emitDel(value);
                        }
                    };
                default: {
                    let value = Reflect.get(target, key);
                    if (typeof (value) == "function")
                        return value.bind(srcSet);
                    else
                        return value;
                }
            }
        },

    }));

    setProxyMap.set(proxyMap, { hookSet: hookSet, srcMap: srcSet });

    return proxyMap;
}

/**
 * 绑定Set的代理
 * 回调函数中不应当进行可能触发钩子的操作
 * @template {any} K
 * @param {Set<K>} proxySet
 * @param {{
 *  add?: (value: K) => void | (() => void),
 *  del?: (value: K) => void
 * }} callbacks
 * @param {{ addExisting?: boolean }} [option]
 * @returns {SetHookBind}
 */
export function bindSetHook(proxySet, callbacks, option = {})
{
    const proxyMata = setProxyMap.get(proxySet);
    if (proxyMata == undefined)
        throw "bindMapHook: Hook callbacks can only be bound from proxy array";

    option = Object.assign({
        noSet: false,
        addExisting: false
    }, option);

    let callbackObj = Object.assign({
        add: () => { },
        del: () => { },
    }, callbacks);



    if (option.addExisting)
    {
        try
        {
            proxyMata.srcMap.forEach((value) =>
            {
                callbackObj.add(value);
            });
        }
        catch (err)
        {
            console.log(err);
        }
    }

    let ret = new SetHookBind(proxySet, proxyMata.hookSet, callbackObj);
    proxyMata.hookSet.add(ret);
    return ret;
}