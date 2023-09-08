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

    /**
     * @param {number} ind
     * @param {any} value
     */
    function emitSet(ind, value)
    {
        hookSet.forEach(o => { o.emitSet(ind, value); });
    }
    /**
     * @param {number} ind
     * @param {any} value
     */
    function emitAdd(ind, value)
    {
        hookSet.forEach(o => { o.emitAdd(ind, value); });
    }
    /**
     * @param {number} ind
     */
    function emitDel(ind)
    {
        hookSet.forEach(o => { o.emitDel(ind); });
    }

    const proxyArray = (new Proxy(srcArray, {
        get: (target, key) => // 取值
        {
            switch (key)
            {
                case "push":
                    return (/** @type {any[]} */ ...items) =>
                    {
                        items.forEach(o =>
                        {
                            emitAdd(oldLength, o);
                            oldLength++;
                        });
                        return srcArray.push(...items);
                    };
                case "pop":
                    return () =>
                    {
                        oldLength--;
                        emitDel(oldLength);
                        return srcArray.pop();
                    };
                case "unshift":
                    return (/** @type {any[]} */ ...items) =>
                    {
                        items.forEach((o, ind) =>
                        {
                            emitAdd(ind, o);
                            oldLength++;
                        });
                        return srcArray.unshift(...items);
                    };
                case "shift":
                    return () =>
                    {
                        oldLength--;
                        emitDel(0);
                        return srcArray.shift();
                    };
                case "splice":
                    return (/** @type {number} */ start, deleteCount = Infinity, /** @type {Array} */ ...items) =>
                    {
                        let actualStartIndex = (
                            start >= 0 ?
                                (
                                    start >= oldLength ? oldLength : start
                                ) :
                                (
                                    start < -oldLength ? 0 : start + oldLength
                                )
                        );
                        let actualDeleteCount = (
                            deleteCount > 0 ?
                                Math.min(deleteCount, oldLength - actualStartIndex) :
                                0
                        );
                        for (let i = 0; i < actualDeleteCount; i++)
                        {
                            emitDel(actualStartIndex);
                        }
                        items.forEach((o, ind) =>
                        {
                            emitAdd(actualStartIndex + ind, o);
                        });
                        return srcArray.splice(start, deleteCount, ...items);
                    };
                case "forEach":
                case "map":
                case "every":
                case "some":
                case "join":
                case "find":
                case "findIndex":
                case "findLast":
                case "findLastIndex":
                case "flat":
                case "flatMap":
                case "includes":
                case "indexOf":
                case "slice":
                    return (/** @type {any} */ ...arg) =>
                    {
                        // @ts-ignore
                        return srcArray[key](...arg);
                    };
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
                            emitDel(i);
                    }
                    else if (newValue > oldLength)
                    {
                        for (let i = oldLength; i < newValue; i++)
                            emitAdd(i, undefined);
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
                                emitAdd(i, undefined);
                        }
                        emitAdd(ind, newValue);
                        oldLength = ind + 1;
                    }
                    else
                    {
                        emitSet(ind, newValue);
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