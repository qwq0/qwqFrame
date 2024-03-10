/**
 * 代理数组 到 钩子映射和目标对象 映射
 * 
 * @type {WeakMap<object, {
*  hookSet: Set<import("./ArrayHookBind").ArrayHookBind>,
*  srcArr: Array
* }>}
*/
export const arrayProxyMap = new WeakMap();