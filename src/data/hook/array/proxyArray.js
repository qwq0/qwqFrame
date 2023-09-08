import { ArrayHookBind } from "./ArrayHookBind.js";
import { arrayProxyMap } from "./hookStatus.js";

/**
 * 创建数组的代理
 * @template {Array} T
 * @param {T} srcArray
 * @returns {T}
 */
export function createHookArray(srcArray)
{
    let oldLength = srcArray.length;
    /**
     * @type {Set<ArrayHookBind>}
     */
    let hookSet = new Set();
    const proxyArray = (new Proxy(srcArray, {
        get: (target, key) => // 取值
        {
            switch (key)
            {
                case "push":
                    return Array.prototype.push;
                case "pop":
                    return Array.prototype.pop;
                default:
                    return Reflect.get(target, key);
            }
        },

        set: (target, key, newValue) => // 设置值
        {
            let ret = Reflect.set(target, key, newValue);
            if (ret)
            {
                if (key == "length")
                {
                    if (newValue < oldLength)
                    {
                        for (let i = oldLength - 1; i >= newValue; i--)
                            hookSet.forEach(o => { o.emitDel(i); });
                    }
                    else if (newValue > oldLength)
                    {
                        for (let i = oldLength; i < newValue; i++)
                            hookSet.forEach(o => { o.emitAdd(i, undefined); });
                    }
                    oldLength = newValue;
                }
                else if ((typeof (key) == "string" && (/^[1-9][0-9]*$/.test(key) || key == "0")) || typeof (key) == "number")
                {
                    let ind = Number(key);
                    if (ind >= oldLength)
                    {
                        if (ind >= oldLength + 1)
                        {
                            for (let i = oldLength; i < ind; i++)
                                hookSet.forEach(o => { o.emitAdd(i, undefined); });
                        }
                        hookSet.forEach(o => { o.emitAdd(ind, newValue); });
                        oldLength = ind + 1;
                    }
                    else
                    {
                        hookSet.forEach(o => { o.emitSet(ind, newValue); });
                    }
                }
            }
            return ret;
        },
    }));
    arrayProxyMap.set(proxyArray, { hookSet: hookSet, srcArr: srcArray });
    return proxyArray;
}


/**
 * 绑定数组的代理
 * @template {Array} T
 * @param {T} proxyArray
 * @param {{
 *  set?: (index: number, value: any) => void;
 *  add: (index: number, value: any) => void;
 *  del: (index: number) => void;
 * }} callbacks
 * @param {{ noSet?: boolean, addExisting?: boolean }} [option]
 * @returns {ArrayHookBind}
 */
export function bindArrayHook(proxyArray, callbacks, option = {})
{
    const proxyMata = arrayProxyMap.get(proxyArray);
    if (proxyMata == undefined)
        throw "bindArrayHook: Hook callbacks can only be bound from proxy array";

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
            throw "bindArrayHook: cannot pass the set function when setting the noSet option";
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
            proxyMata.srcArr.forEach((e, ind) =>
            {
                callbackObj.add(ind, e);
            });
        }
        catch (err)
        {
            console.log(err);
        }
    }

    let ret = new ArrayHookBind(callbackObj);
    proxyMata.hookSet.add(ret);
    return ret;
}