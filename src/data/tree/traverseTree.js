/**
 * 递归遍历一棵树
 * 自下而上
 * node的child属性作为子节点数组
 * @param {any} node
 * @param {function(any, any) : void} callback arg0为子节点 arg1为父节点
 */
export function traverseTree(node, callback)
{
    if (typeof (node) == "object" || node.child)
        (/** @type {Array} */ node.child).forEach((/** @type {any} */ e) =>
        {
            traverseTree(e, callback);
            callback(e, node);
        });
}

/**
 * 递归遍历一棵树
 * 自上而下
 * node的child属性作为子节点数组
 * @param {any} node
 * @param {function(any, any) : void} callback arg0为子节点 arg1为父节点
 */
export function traverseTreeFT(node, callback)
{
    if (typeof (node) == "object" || node.child)
        (/** @type {Array} */ node.child).forEach((/** @type {any} */ e) =>
        {
            callback(e, node);
            traverseTreeFT(e, callback);
        });
}