/**
 * 代理对象 到 钩子映射和目标对象 映射
 * @type {WeakMap<object, {
 *  hookMap: Map<string | symbol, Set<HookBindValue | HookBindCallback>>,
 *  srcObj: object
 * }>}
 */
const proxyMap = new WeakMap();
/**
 * 目标对象 到 引用集合 映射
 * 确保当目标对象存活时引用集合的引用存活
 * 目前仅在HookBindCallback中使用
 * @type {WeakMap<object, Set<any>>}
 */
const targetRefMap = new WeakMap();

/**
 * 记录器
 * 在目标对象销毁时销毁钩子
 * @type {FinalizationRegistry<HookBindValue | HookBindCallback>}
 */
const register = new FinalizationRegistry(heldValue =>
{
    heldValue.destroy();
});

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

/**
 * 钩子绑定到回调类
 */
export class HookBindCallback
{
    /**
     * 钩子信息
     * @type {HookBindInfo}
     */
    info = null;

    /**
     * 回调函数的弱引用
     * @type {WeakRef<function(any): void>}
     */
    cbRef = null;
    /**
     * 回调函数
     * 当此钩子绑定自动释放时为null
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
        this.cbRef = new WeakRef(callback);
        this.callback = callback;
        info.addHook(this);
    }

    /**
     * 触发此钩子
     */
    emit()
    {
        let callback = this.cbRef.deref();
        if (callback)
        {
            try
            {
                callback(this.info.getValue());
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
        this.info.removeHook(this);
        register.unregister(this);
    }

    /**
     * 绑定销毁
     * 当目标对象释放时销毁
     * @param {object} targetObj
     * @returns {HookBindCallback} 返回自身
     */
    bindDestroy(targetObj)
    {
        let targetRefSet = targetRefMap.get(targetObj);
        if (targetRefSet == undefined)
        {
            targetRefSet = new Set();
            targetRefMap.set(targetObj, targetRefSet);
        }
        targetRefSet.add(this.callback);
        this.callback = null;
        register.register(targetObj, this, this);
        return this;
    }
}

/**
 * 钩子绑定到值类
 */
export class HookBindValue
{
    /**
     * 钩子信息
     * @type {HookBindInfo}
     */
    info = null;

    /**
     * 目标对象
     * @type {WeakRef<object>}
     */
    targetRef = null;
    /**
     * 目标对象的键
     * @type {string | symbol}
     */
    targetKey = "";

    /**
     * @param {HookBindInfo} info
     * @param {object} targetObj
     * @param {string | symbol} targetKey
     */
    constructor(info, targetObj, targetKey)
    {
        this.info = info;
        this.targetRef = new WeakRef(targetObj);
        this.targetKey = targetKey;
        info.addHook(this);
        register.register(targetObj, this, this);
    }

    /**
     * 触发此钩子
     * 销毁后仍可通过此方法手动触发
     */
    emit()
    {
        let target = this.targetRef.deref();
        if (target != undefined)
        {
            try
            {
                target[this.targetKey] = this.info.getValue();
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
        this.info.removeHook(this);
        register.unregister(this);
    }
}