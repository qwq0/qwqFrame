/**
 * 代理数组 到 钩子映射和目标对象 映射
 * 
 * @type {WeakMap<object, {
*  hookSet: Set<import("./ArrayHookBind").ArrayHookBind>,
*  srcArr: Array
* }>}
*/
export const arrayProxyMap = new WeakMap();

/**
 * 目标对象 到 引用集合 映射
 *
 * 确保当目标对象存活时引用集合的引用存活
 * @type {WeakMap<object, Set<any>>}
 */
export const targetRefMap = new WeakMap();

/**
 * 记录器

 * 在目标对象销毁时销毁钩子
 * @type {FinalizationRegistry<import("./ArrayHookBind").ArrayHookBind>}
 */
export const register = new FinalizationRegistry(heldValue =>
{
    heldValue.destroy();
});