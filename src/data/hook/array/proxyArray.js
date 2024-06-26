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
            // TODO 此处构建的函数可缓存
            switch (key)
            {
                case "push":
                    return (/** @type {any[]} */ ...items) =>
                    {
                        let ret = srcArray.push(...items);
                        items.forEach(o =>
                        {
                            oldLength++;
                            emitAdd(oldLength - 1, o);
                        });
                        return ret;
                    };
                case "pop":
                    return () =>
                    {
                        let ret = srcArray.pop();
                        if (oldLength > 0)
                        {
                            oldLength--;
                            emitDel(oldLength);
                        }
                        return ret;
                    };
                case "unshift":
                    return (/** @type {any[]} */ ...items) =>
                    {
                        let ret = srcArray.unshift(...items);
                        items.forEach((o, ind) =>
                        {
                            oldLength++;
                            emitAdd(ind, o);
                        });
                        return ret;
                    };
                case "shift":
                    return () =>
                    {
                        let ret = srcArray.shift();
                        if (oldLength > 0)
                        {
                            oldLength--;
                            emitDel(0);
                        }
                        return ret;
                    };
                case "splice":
                    return (/** @type {number} */ start, deleteCount = Infinity, /** @type {Array} */ ...items) =>
                    {
                        let ret = srcArray.splice(start, deleteCount, ...items);
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
                        for (let i = actualDeleteCount - 1; i >= 0; i--)
                        {
                            oldLength--;
                            emitDel(actualStartIndex + i);
                        }
                        items.forEach((o, ind) =>
                        {
                            oldLength++;
                            emitAdd(actualStartIndex + ind, o);
                        });
                        return ret;
                    };
                case "at":
                case "concat":
                case "forEach":
                case "map":
                case "every":
                case "some":
                case "reduce":
                case "reduceRight":
                case "join":
                case "find":
                case "findIndex":
                case "findLast":
                case "findLastIndex":
                case "flat":
                case "flatMap":
                case "includes":
                case "indexOf":
                case "lastIndexOf":
                case "slice":
                case "with":
                case "toString":
                case "toLocaleString":
                case "toReversed":
                case "toSorted":
                case "toSpliced":
                case "keys":
                case "values":
                case "entries":
                    return (/** @type {any} */ ...arg) =>
                    {
                        // @ts-ignore
                        return srcArray[key](...arg);
                    };
                case "reverse":
                case "sort":
                    return (/** @type {any} */ ...arg) =>
                    {
                        // @ts-ignore
                        let ret = srcArray[key](...arg);
                        for (let i = oldLength - 1; i >= 0; i--)
                            emitDel(i);
                        for (let i = 0; i < oldLength; i++)
                            emitAdd(i, srcArray[i]);
                        return ret;
                    };
                case "copyWithin":
                    return (/** @type {number} */ targetIndex, /** @type {number} */ start, /** @type {number} */ end) =>
                    {
                        return Array.prototype.copyWithin.call(proxyArray, targetIndex, start, end);
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
                    let oldLengthBefore = oldLength;
                    oldLength = newValue;
                    if (newValue < oldLengthBefore)
                    {
                        for (let i = oldLengthBefore - 1; i >= newValue; i--)
                            emitDel(i);
                    }
                    else if (newValue > oldLengthBefore)
                    {
                        for (let i = oldLengthBefore; i < newValue; i++)
                            emitAdd(i, undefined);
                    }
                }
                else if ((typeof (key) == "string" && (/^[1-9][0-9]*$/.test(key) || key == "0")) || typeof (key) == "number")
                {
                    let ind = Number(key);
                    if (ind >= oldLength)
                    {
                        let oldLengthBefore = oldLength;
                        oldLength = ind + 1;
                        if (ind >= oldLengthBefore + 1)
                        {
                            for (let i = oldLengthBefore; i < ind; i++)
                                emitAdd(i, undefined);
                        }
                        emitAdd(ind, newValue);
                    }
                    else
                    {
                        emitSet(ind, newValue);
                    }
                }
            }
            return ret;
        },

        deleteProperty: (target, key) => // 删除值
        {
            let ret = delete srcArray[key];
            if ((typeof (key) == "string" && (/^[1-9][0-9]*$/.test(key) || key == "0")) || typeof (key) == "number")
            {
                let ind = Number(key);
                if (ind < oldLength)
                {
                    emitSet(ind, undefined);
                }
            }
            return ret;
        }
    }));

    arrayProxyMap.set(proxyArray, { hookSet: hookSet, srcArr: srcArray });

    return proxyArray;
}


/**
 * 绑定数组的代理
 * 回调函数中不应当进行可能触发钩子的操作
 * @template {any} K
 * @param {Array<K>} proxyArray
 * @param {{
 *  set?: (index: number, value: K) => void;
 *  add: (index: number, value: K) => void;
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

    let ret = new ArrayHookBind(proxyArray, proxyMata.hookSet, callbackObj);
    proxyMata.hookSet.add(ret);
    return ret;
}