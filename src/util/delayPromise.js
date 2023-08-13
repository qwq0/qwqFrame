/**
 * 异步延迟
 * 将创建一个Promise并在指定延迟时间后解决
 * @param {number} time 单位:毫秒
 * @returns {Promise<void>}
 */
export function delayPromise(time)
{
    return (new Promise((resolve, reject) =>
    {
        setTimeout(() =>
        {
            resolve();
        }, time);
    }));
}