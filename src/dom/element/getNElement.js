import { NElement } from "./NElement.js";

const symbolKey = Symbol("NElement");
/**
 * 根据HTMLElement对象获取NElement对象
 * 如果没有则生成
 * @template {HTMLElement} ElementObjectType
 * @param {ElementObjectType} element
 * @returns {NElement<ElementObjectType>}
 */
export function getNElement(element)
{
    if(element[symbolKey])
        return element[symbolKey];
    else
        return element[symbolKey] = new NElement(element);
}