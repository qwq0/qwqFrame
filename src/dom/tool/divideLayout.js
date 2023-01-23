import { NElement } from "../element/NElement.js";
import { expandElement } from "./expandElement.js";

/**
 * 左右方向分割
 * @param {string} leftSize
 * @param {NElement | import("./expandElement").EDObj} a
 * @param {NElement | import("./expandElement").EDObj} b
 * @returns {NElement}
 */
export function divideLayout_LR(leftSize, a, b)
{
    return divideLayout(expandElement({
        style: {
            flexFlow: "row"
        },
        child: [
            a,
            b
        ],
        assembly: [e =>
        {
            e.getChild(0).setStyles({
                width: leftSize,
                minWidth: leftSize
            });
        }]
    }));
}

/**
 * 上下方向分割
 * @param {string} upSize
 * @param {NElement | import("./expandElement").EDObj} a
 * @param {NElement | import("./expandElement").EDObj} b
 * @returns {NElement}
 */
export function divideLayout_UD(upSize, a, b)
{
    return divideLayout(expandElement({
        style: {
            flexFlow: "column"
        },
        child: [
            a,
            b
        ],
        assembly: [e =>
        {
            e.getChild(0).setStyles({
                height: upSize,
                minHeight: upSize
            });
        }]
    }));
}

/**
 * 右左方向分割
 * @param {string} rightSize
 * @param {NElement | import("./expandElement").EDObj} a
 * @param {NElement | import("./expandElement").EDObj} b
 * @returns {NElement}
 */
export function divideLayout_RL(rightSize, a, b)
{
    return divideLayout(expandElement({
        style: {
            flexFlow: "row-reverse"
        },
        child: [
            a,
            b
        ],
        assembly: [e =>
        {
            e.getChild(0).setStyles({
                width: rightSize,
                minWidth: rightSize
            });
        }]
    }));
}

/**
 * 下上方向分割
 * @param {string} downSize
 * @param {NElement | import("./expandElement").EDObj} a
 * @param {NElement | import("./expandElement").EDObj} b
 * @returns {NElement}
 */
export function divideLayout_DU(downSize, a, b)
{
    return divideLayout(expandElement({
        style: {
            flexFlow: "column-reverse"
        },
        child: [
            a,
            b
        ],
        assembly: [e =>
        {
            e.getChild(0).setStyles({
                height: downSize,
                minHeight: downSize
            });
        }]
    }));
}

/**
 * 设置为分割视图
 * @param {NElement} p 父节点
 * @returns {NElement} 返回父节点
 */
function divideLayout(p)
{
    p.setDisplay("flex");
    p.setStyles({
        alignItems: "stretch",
        justifyContent: "space-between"
    });
    let childs = p.getChilds();
    childs[1].setStyle("flexGrow", 1);
    return p;
}