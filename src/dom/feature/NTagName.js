/**
 * 标签名
 * 标签名使用小写字母
 * 不包含此类的特征列表默认为div
 * 一层特征列表只能有唯一tagName (或等价的)
 * @template {keyof HTMLElementTagNameMap} T
 */
export class NTagName
{
    /**
     * @type {T}
     */
    tagName = null;

    /**
     * @param {T} tagName
     */
    constructor(tagName)
    {
        this.tagName = /** @type {T} */(tagName.toLowerCase());
    }
}

/**
 * 快速创建 NTagName 实例
 * @type {{
 *  [x in keyof HTMLElementTagNameMap]?: NTagName<x>
 * }}
 */
export let nTagName = new Proxy({}, {
    get: (_target, key) =>
    {
        // @ts-ignore
        return new NTagName(key);
    },
    set: () => false
});