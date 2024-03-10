/**
 * 代理对象 到 钩子映射和源对象 映射
 * 
 * @type {WeakMap<object, {
 *  hookMap: Map<string | symbol, Set<import("./HookBindValue").HookBindValue | import("./HookBindCallback").HookBindCallback>>,
 *  srcObj: object
 * }>}
 */
export const proxyMap = new WeakMap();