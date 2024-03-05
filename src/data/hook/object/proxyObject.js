import { HookBindCallback } from "./HookBindCallback.js";
import { HookBindInfo } from "./HookBindInfo.js";
import { HookBindValue } from "./HookBindValue.js";
import { proxyMap } from "./hookStatus.js";


/**
 * 创建对象的代理
 * @template {object} T
 * @param {T} srcObj
 * @returns {T}
 */
export function createHookObj(srcObj)
{
    if (proxyMap.has(srcObj)) // 已经是代理对象
        throw "Unable to create a proxy for a proxy object";
    /**
     * 修改指定值时需要触发的钩子
     * @type {Map<string | symbol, Set<HookBindValue | HookBindCallback>>}
     */
    const hookMap = new Map();
    const proxyObj = (new Proxy((/** @type {object} */(srcObj)), {
        get: (target, key) => // 取值
        {
            return Reflect.get(target, key);
        },

        set: (target, key, newValue) => // 设置值
        {
            let ret = Reflect.set(target, key, newValue);
            if (ret)
            {
                let hookSet = hookMap.get(key);
                if (hookSet) // 若此key上存在钩子集合
                {
                    hookSet.forEach(o =>
                    {
                        o.emit(); // 触发每个钩子
                    });
                }
            }
            return ret;
        },

        // TODO 应当当作设置为undefined 并创建专用方法解除绑定钩子
        deleteProperty: (target, key) => // 删除值
        {
            let ret = Reflect.deleteProperty(target, key);
            if (ret)
            {
                let hookSet = hookMap.get(key);
                if (hookSet) // 若此key上存在钩子集合
                {
                    hookSet.forEach(o =>
                    {
                        o.destroy(); // 销毁每个钩子
                    });
                    hookMap.delete(key); // 移除此key上的钩子集合
                }
            }
            return ret;
        }
    }));
    proxyMap.set(proxyObj, { hookMap, srcObj });
    return proxyObj;
}

/**
 * 获取代理对象中指定值的绑定信息
 * @template {Object} T
 * @param {T} proxyObj
 * @param {[(keyof T) | (string & {}) | symbol] | [((keyof T) | (string & {}) | symbol), ...Array<(keyof T) | (string & {}) | symbol>, function(...any): any]} keys
 * @returns {HookBindInfo}
 */
export function bindValue(proxyObj, ...keys)
{
    const ctFunc = (/** @type {function(...any): any} */(keys.length >= 2 ? keys.pop() : null));
    const proxyMata = proxyMap.get(proxyObj);
    if (proxyMata == undefined)
        throw "bindValue: Values can only be bound from proxy objects";
    return new HookBindInfo(proxyObj, proxyMata.srcObj, (/** @type {Array<string | symbol>}*/(keys)), proxyMata.hookMap, ctFunc);
}






