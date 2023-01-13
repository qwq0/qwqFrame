/**
 * 包装为仅能执行一次的函数
 * @template P
 * @template R
 * @template {function(...P) : R} T
 * @param {T} func
 * @returns {T}
 */
export function runOnce(func)
{
    let runned = false;
    return /** @type {T} */ ((...para) =>
    {
        if (runned)
            return null;
        else
        {
            runned = true;
            return func(...para);
        }
    });
}