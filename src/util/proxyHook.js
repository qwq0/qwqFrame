/**
 * 代理对象 到 目标对象 映射
 * @type {WeakMap<object, {
 *  hookMap: Map<string | symbol, Set<WeakRef<HookBindValue | HookBindCallback>>>,
 *  srcObj: object
 * }>}
 */
let proxyMap = new WeakMap();
/**
 * 目标对象 到 绑定对象集合 映射
 * 此处是对绑定对象唯一的强引用
 * 当目标对象释放时 绑定对象自动释放
 * @type {WeakMap<object, Set<HookBindValue | HookBindCallback>>}
 */
let targetMap = new WeakMap();

/**
 * 创建对象的代理
 * @template {object} T
 * @param {T} srcObj
 * @returns {T}
 */
export function createHookObj(srcObj)
{
    if (proxyMap.has(srcObj))
        throw "Unable to create a proxy for a proxy object";
    /**
     * 修改指定值时需要触发的钩子
     * @type {Map<string | symbol, Set<WeakRef<HookBindValue | HookBindCallback>>>}
     */
    const hookMap = new Map();
    const proxyObj = (new Proxy((/** @type {object} */(srcObj)), {
        get: (target, key) =>
        {
            return Reflect.get(target, key);
        },
        set: (target, key, newValue) =>
        {
            let ret = Reflect.set(target, key, newValue);
            let hookSet = hookMap.get(key);
            if (hookSet)
            {
                hookSet.forEach(o =>
                {
                    let hook = o.deref();
                    if (hook === undefined)
                        hookSet.delete(o);
                    else
                        hook.emit();
                });
                if (hookSet.size == 0)
                    hookMap.delete(key);
                console.log(`[debug]触发了钩子 影响了${hookSet.size}个值`);
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
 * @param {[(keyof T) | (string & {}) | symbol] | [...Array<(keyof T) | (string & {}) | symbol>, function(...any): any]} keys
 * @returns {HookBindInfo}
 */
export function bindValue(proxyObj, ...keys)
{
    const ctFunc = (/** @type {function(...any): any} */(keys.length >= 2 ? keys.pop() : null));
    const proxyMata = proxyMap.get(proxyObj);
    return new HookBindInfo(proxyObj, proxyMata.srcObj, (/** @type {Array<string | symbol>}*/(keys)), proxyMata.hookMap, ctFunc);
}


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
     * @type {Map<string | symbol, Set<WeakRef<HookBindValue | HookBindCallback>>>}
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
     * @param {Map<string | symbol, Set<WeakRef<HookBindValue | HookBindCallback>>>} hookMap
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
     * 绑定到值
     * @template {Object} T
     * @param {T} targetObj
     * @param {(keyof T) | (string & {}) | symbol} targetKey
     */
    bindToValue(targetObj, targetKey)
    {
        const ret = new HookBindValue(this, targetObj, (/** @type {string | symbol} */(targetKey)));
        this.keys.forEach(o =>
        {
            let set = this.hookMap.get(o);
            if (set == undefined)
            {
                set = new Set();
                this.hookMap.set(o, set);
            }
            set.add(new WeakRef(ret));
        });
        let targetHookSet = targetMap.get(targetObj);
        if (targetHookSet == undefined)
        {
            targetHookSet = new Set();
            targetMap.set(targetObj, targetHookSet);
        }
        targetHookSet.add(ret);
        return ret;
    }
}

/**
 * 钩子绑定到回调类
 */
class HookBindCallback
{
    /**
     * 钩子信息
     * @type {HookBindInfo}
     */
    info = null;

    /**
     * 回调函数
     * @type {function(any): void}
     */
    callback = null;

    /**
     * @param {HookBindInfo} info
     * @param {function(any): void} callback
     */
    constructor(info, callback)
    {
        this.info = info;
        this.callback = callback;
    }

    /**
     * 触发此钩子
     */
    emit()
    {
        this.callback(this.info.getValue());
    }
}

/**
 * 钩子绑定到值类
 */
class HookBindValue
{
    /**
     * 钩子信息
     * @type {HookBindInfo}
     */
    info = null;

    /**
     * 目标对象
     * @type {object}
     */
    target = null;
    /**
     * 目标对象的键
     * @type {string | symbol}
     */
    targetKey = "";

    /**
     * @param {HookBindInfo} info
     * @param {any} targetObj
     * @param {string | symbol} targetKey
     */
    constructor(info, targetObj, targetKey)
    {
        this.info = info;
        this.target = targetObj;
        this.targetKey = targetKey;
    }

    /**
     * 触发此钩子
     */
    emit()
    {
        this.target[this.targetKey] = this.info.getValue();
    }
}