import { NAsse } from "../../feature/NAsse.js";

/**
 * 生成添加类名的流水线
 * @param {string | Array<string>} classNames 多个用空格分隔的类名
 */
export function classNames(classNames)
{
    let classNameList = (
        typeof (classNames) == "string" ?
            classNames.split(" ") :
            classNames.map(o => o.split(" ")).flat()
    );
    return new NAsse(e =>
    {
        classNameList.forEach(o =>
        {
            (/** @type {HTMLElement} */(e.element)).classList.add(o);
        });
    });
}