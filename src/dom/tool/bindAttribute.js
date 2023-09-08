import { NElement } from "../element/NElement.js";

/**
 * 绑定元素属性到对象作为getter/setter
 * @template {Object} T
 * @param {string} attrName
 * @param {T} obj
 * @param {(keyof T) | (string & {})} key
 * @param {boolean} [noInitialize] 不将对象中原来的值赋给元素属性
 * @returns {(element: NElement) => void} 流水线函数
 */
export function bindAttribute(attrName, obj, key, noInitialize = false)
{
    return ((ele) =>
    {
        // @ts-ignore
        if (Object.hasOwn(obj, key))
        {
            if (!noInitialize)
                // @ts-ignore
                ele.element[attrName] = obj[key];
            // @ts-ignore
            delete obj[key];
        }
        Object.defineProperty(obj, key, {
            get: () =>
            {
                return ele.element[attrName];
            },
            set: (newValue) =>
            {
                ele.element[attrName] = newValue;
            },
            enumerable: true,
            configurable: true
        });
    });
}