/**
 * 代理对象 到 钩子映射和源对象 映射
 * 
 * @type {WeakMap<object, {
 *  hookMap: Map<string | symbol, Set<import("./HookBindValue").HookBindValue | import("./HookBindCallback").HookBindCallback>>,
 *  srcObj: object
 * }>}
 */
export const proxyMap = new WeakMap();
/**
 * 目标对象 到 引用集合 映射
 *
 * 确保当目标对象存活时引用集合的引用存活
 * 目前仅在HookBindCallback中使用
 * @type {WeakMap<object, Set<any>>}
 */
export const targetRefMap = new WeakMap();

/**
 * 记录器

 * 在目标对象销毁时销毁钩子
 * @type {FinalizationRegistry<import("./HookBindValue").HookBindValue | import("./HookBindCallback").HookBindCallback>}
 */
export const register = new FinalizationRegistry(heldValue =>
{
    heldValue.destroy();
});