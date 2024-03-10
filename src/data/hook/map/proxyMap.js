import { MapHookBind } from "./MapHookBind.js";
import { mapProxyMap } from "./hookStatus.js";

/**
 * 创建Map的代理
 * @template {Map} T
 * @param {T} srcMap
 * @returns {T}
 */
export function createHookMap(srcMap)
{
    /**
     * @type {Set<MapHookBind>}
     */
    let hookSet = new Set();

    /**
     * @param {any} key
     * @param {any} value
     */
    function emitAdd(key, value)
    {
        hookSet.forEach(o => { o.emitAdd(key, value); });
    }

    /**
     * @param {any} key
     * @param {any} value
     */
    function emitSet(key, value)
    {
        hookSet.forEach(o => { o.emitSet(key, value); });
    }

    /**
     * @param {any} key
     */
    function emitDel(key)
    {
        hookSet.forEach(o => { o.emitDel(key); });
    }

    const proxyMap = (new Proxy(srcMap, {
        get: (target, key) => // 取值
        {
            // TODO 此处构建的函数可缓存
            switch (key)
            {
                case "set":
                    return (/** @type {any} */ key, /** @type {any} */ value) =>
                    {
                        let has = srcMap.has(key);

                        srcMap.set(key, value);

                        if (has)
                            emitSet(key, value);
                        else
                            emitAdd(key, value);

                        return proxyMap;
                    };
                case "delete":
                    return (/** @type {any} */ key) =>
                    {
                        let has = srcMap.delete(key);

                        if (has)
                            emitDel(key);

                        return has;
                    };
                case "clear":
                    return () =>
                    {
                        let keys = srcMap.keys();

                        srcMap.clear();

                        for (let key of keys)
                        {
                            emitDel(key);
                        }
                    };
                default: {
                    let value = Reflect.get(target, key);
                    if (typeof (value) == "function")
                        return value.bind(srcMap);
                    else
                        return value;
                }
            }
        },

    }));

    mapProxyMap.set(proxyMap, { hookSet: hookSet, srcMap: srcMap });

    return proxyMap;
}

/**
 * 绑定Map的代理
 * 回调函数中不应当进行可能触发钩子的操作
 * @template {any} K
 * @template {any} V
 * @param {Map<K, V>} proxyMap
 * @param {import("./MapHookBind.js").callbackType} callbacks
 * @param {{ noSet?: boolean, addExisting?: boolean }} [option]
 * @returns {MapHookBind}
 */
export function bindMapHook(proxyMap, callbacks, option = {})
{
    const proxyMata = mapProxyMap.get(proxyMap);
    if (proxyMata == undefined)
        throw "bindMapHook: Hook callbacks can only be bound from proxy array";

    option = Object.assign({
        noSet: false,
        addExisting: false
    }, option);

    let callbackObj = Object.assign({
        set: () => { },
        add: () => { },
        del: () => { },
    }, callbacks);

    if (option.noSet)
    {
        if (callbacks.set != undefined)
        {
            throw "bindMapHook: cannot pass the set function when setting the noSet option";
        }
        callbackObj.set = (ind, value) =>
        {
            callbackObj.del(ind);
            callbackObj.add(ind, value);
        };
    }


    if (option.addExisting)
    {
        try
        {
            proxyMata.srcMap.forEach((value, key) =>
            {
                callbackObj.add(key, value);
            });
        }
        catch (err)
        {
            console.log(err);
        }
    }

    let ret = new MapHookBind(proxyMap, proxyMata.hookSet, callbackObj);
    proxyMata.hookSet.add(ret);
    return ret;
}