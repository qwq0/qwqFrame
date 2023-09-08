import { register, targetRefMap } from "./hookStatus.js";

/**
 * 数组钩子绑定类
 */
export class ArrayHookBind
{
    /**
     * 回调函数的弱引用
     * @type {WeakRef<typeof ArrayHookBind.prototype.callback>}
     */
    cbRef = null;

    /**
     * 回调函数
     * 当此钩子绑定自动释放时为null
     */
    callback = {
        /** @type {(index: number, value: any) => void} */
        set: null,
        /** @type {(index: number, value: any) => void} */
        add: null,
        /** @type {(index: number) => void} */
        del: null
    };

    /**
     * @param {typeof ArrayHookBind.prototype.callback} callback
     */
    constructor(callback)
    {
        this.cbRef = new WeakRef(callback);
        this.callback = Object.assign({}, callback);
    }

    /**
     * 触发此钩子 (设置)
     * @param {number} index
     * @param {any} value
     */
    emitSet(index, value)
    {
        let callback = this.cbRef.deref();
        if (callback)
        {
            try
            {
                callback.set(index, value);
            }
            catch (err)
            {
                console.error(err);
            }
        }
    }

    /**
     * 触发此钩子 (增加)
     * @param {number} index
     * @param {any} value
     */
    emitAdd(index, value)
    {
        let callback = this.cbRef.deref();
        if (callback)
        {
            try
            {
                callback.add(index, value);
            }
            catch (err)
            {
                console.error(err);
            }
        }
    }

    /**
     * 触发此钩子 (删除)
     * @param {number} index
     */
    emitDel(index)
    {
        let callback = this.cbRef.deref();
        if (callback)
        {
            try
            {
                callback.del(index);
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
        register.unregister(this);
    }

    /**
     * 绑定销毁
     * 当目标对象释放时销毁
     * @param {object} targetObj
     * @returns {ArrayHookBind} 返回自身
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