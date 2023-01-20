/**
 * 代理对象 到 目标对象 映射
 * @type {WeakMap<object, {}>}
 */
let proxyToTargetMap = new WeakMap();

/**
 * 代理钩子
 * @param {object} targerObj
 */
export function proxyHook(targerObj)
{
    return (new Proxy(targerObj, {
        get: (targer, key) =>
        {
            return Reflect.get(targer, key);
        },
        set: (target, key, newValue) =>
        {
            return Reflect.set(target, key, newValue);
        }
    }));
}