/**
 * 所有钩子绑定类
 * @typedef { null |
 *  import("./array/ArrayHookBind").ArrayHookBind | 
 *  import("./map/MapHookBind").MapHookBind | 
 *  import("./object/HookBindValue").HookBindValue | 
 *  import("./object/HookBindCallback").HookBindCallback | 
 *  import("./set/SetHookBind").SetHookBind
 * } AllHookBind
 */

/**
 * 目标钩子 到 绑定销毁此钩子的对象的数量 映射
 * @type {WeakMap<AllHookBind, number>}
 */
const hookBindDestroyCountMap = new WeakMap();

/**
 * 记录器

 * 在目标对象销毁时销毁钩子
 * @type {FinalizationRegistry<AllHookBind>}
 */
const register = new FinalizationRegistry(heldValue =>
{
    let hookBindDestroyCount = hookBindDestroyCountMap.get(heldValue);

    if (hookBindDestroyCount >= 2)
        hookBindDestroyCountMap.set(heldValue, hookBindDestroyCount - 1);
    else
        heldValue.destroy();
});

/**
 * 钩子绑定销毁
 * 用于在目标对象销毁时销毁钩子
 * @param {object} targetObj 
 * @param {AllHookBind} targetHook 
 */
export function hookBindDestroy(targetObj, targetHook)
{
    let hookBindDestroyCount = hookBindDestroyCountMap.get(targetHook);

    if (hookBindDestroyCount == undefined)
        hookBindDestroyCount = 0;

    hookBindDestroyCountMap.set(targetHook, hookBindDestroyCount + 1);

    register.register(targetObj, targetHook, targetHook);
}

/**
 * 释放钩子绑定销毁
 * 解除 用于销毁钩子的对象 对 钩子 的引用
 * 防止手动销毁钩子时内存泄漏
 * @param {AllHookBind} targetHook
 */
export function freeHookBindDestroy(targetHook)
{
    register.unregister(targetHook);
}