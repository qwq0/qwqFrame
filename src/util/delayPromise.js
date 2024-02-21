/**
 * 异步延迟
 * 将创建一个Promise并在指定延迟时间后解决
 * @param {number} time 单位:毫秒
 * @returns {Promise<void>}
 */
export function delayPromise(time)
{
    return (new Promise((resolve) =>
    {
        setTimeout(() =>
        {
            resolve();
        }, time);
    }));
}

/**
 * 异步延迟带值
 * 将创建一个Promise并在指定延迟时间后解决
 * @template {any} T
 * @param {number} time 单位:毫秒
 * @param {T} resolveValue
 * @returns {Promise<T>}
 */
export function delayPromiseWithResolve(time, resolveValue)
{
    return (new Promise((resolve) =>
    {
        setTimeout(() =>
        {
            resolve(resolveValue);
        }, time);
    }));
}

/**
 * 异步延迟拒绝
 * 将创建一个Promise并在指定延迟时间后拒绝
 * @param {number} time 单位:毫秒
 * @param {any} rejectReason
 * @returns {Promise<void>}
 */
export function delayPromiseWithReject(time, rejectReason)
{
    return (new Promise((_resolve, reject) =>
    {
        setTimeout(() =>
        {
            reject(rejectReason);
        }, time);
    }));
}