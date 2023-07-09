import { HookBindCallback } from "./HookBindCallback.js";
import { HookBindValue } from "./HookBindValue.js";

/**
 * 钩子绑定信息
 */
export class HookBindInfo
{
    /**
     * 代理对象
     * @type {object}
     */
    proxyObj = null;
    /**
     * 源对象
     * @type {object}
     */
    srcObj = null;
    /**
     * 需要监听代理对象上的值
     * @type {Array<string | symbol>}
     */
    keys = [];
    /**
     * 修改指定值时需要触发的钩子
     * @type {Map<string | symbol, Set<HookBindValue | HookBindCallback>>}
     */
    hookMap = null;
    /**
     * 值处理函数
     * 若存在此函数则需要调用
     * @type {function(...any): any} 
     */
    ctFunc = null;

    /**
     * @param {object} proxyObj
     * @param {object} srcObj
     * @param {Array<string | symbol>} keys
     * @param {Map<string | symbol, Set<HookBindValue | HookBindCallback>>} hookMap
     * @param {function(...any): any} ctFunc
     */
    constructor(proxyObj, srcObj, keys, hookMap, ctFunc)
    {
        this.proxyObj = proxyObj;
        this.srcObj = srcObj;
        this.keys = keys;
        this.hookMap = hookMap;
        this.ctFunc = ctFunc;
    }

    /**
     * 获取此钩子绑定的值
     */
    getValue()
    {
        return (this.ctFunc ? this.ctFunc(...this.keys.map(o => this.srcObj[o])) : this.srcObj[this.keys[0]]);
    }

    /**
     * 添加钩子
     * @package
     * @param {HookBindValue | HookBindCallback} hookObj
     */
    addHook(hookObj)
    {
        this.keys.forEach(o =>
        {
            let set = this.hookMap.get(o);
            if (set == undefined)
            {
                set = new Set();
                this.hookMap.set(o, set);
            }
            set.add(hookObj);
        });
    }

    /**
     * 移除钩子
     * @package
     * @param {HookBindValue | HookBindCallback} hookObj
     */
    removeHook(hookObj)
    {
        this.keys.forEach(o =>
        {
            let set = this.hookMap.get(o);
            if (set)
            {
                set.delete(hookObj);
                if (set.size == 0)
                    this.hookMap.delete(o);
            }
        });
    }

    /**
     * 绑定到值
     * @template {Object} T
     * @param {T} targetObj
     * @param {(keyof T) | (string & {}) | symbol} targetKey
     * @returns {HookBindValue}
     */
    bindToValue(targetObj, targetKey)
    {
        return new HookBindValue(this, targetObj, (/** @type {string | symbol} */(targetKey)));
    }

    /**
     * 绑定到回调函数
     * @param {function(any): void} callback
     * @returns {HookBindCallback}
     */
    bindToCallback(callback)
    {
        return new HookBindCallback(this, callback);
    }
}