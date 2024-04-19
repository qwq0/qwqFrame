import { NElement, getNElement } from "../../node/NElement.js";

/**
 * 遍历展开元素
 * @typedef {{
 *     id?:  string, // id
 *     left?: string, // 距左边(style)
 *     top?: string, // 距顶边(style)
 *     right?: string, // 距右边(style)
 *     bottom?: string, // 距底边(style)
 *     width?: string, // 宽度(style)
 *     height?: string, // 高度(style)
 *     position?: "static" | "absolute" | "relative" | "fixed" | string, // 定位方式(style)
 *     display?: "block" | "inline" | "none" | "inline-block" | string, // 显示方式(style)
 *     overflow?: "visible" | "hidden" | "scroll" | "auto" | string, // 超出部分(style)
 *     tagName?: string, // html标签名(标签类型)
 *     classList?: Array<string>, // html标签类名列表
 *     text?: string, // 文本
 *     style?: {[x in (keyof CSSStyleDeclaration)]?: string | number} | {[x: string]: string | number}, // 样式对象
 *     attr?: Object<string, string>, // 属性对象(HTMLElement的附加属性)
 *     event?: {[x in (keyof HTMLElementEventMap)]?: (function(Event) : void)} | {[x: string]: (function(Event) : void)}, // 事件绑定
 *     child?: Array<EDObj | NElement>, // 子节点
 *     assembly?: Array<function(NElement) : void | NElement>, // 流水线
 *     [x: string]: any
 * }} EDObj
 * @param {EDObj} obj
 * @returns {NElement}
*/
function expEle(obj)
{
    let now = getNElement(document.createElement(obj.tagName ? obj.tagName : "div"));

    ([
        "height",
        "width",
        "position",
        "top",
        "left",
        "right",
        "bottom",
        "display",
        "overflow"
    ]).forEach(key =>
    {
        if (obj[key])
        {
            now.setStyle(key, obj[key]);
        }
    });

    if (obj.style)
        now.setStyles(obj.style);
    if (obj.text)
        now.setText(obj.text);
    if (obj.attr)
        now.setAttrs(obj.attr);
    if (obj.classList)
        now.node.classList.add(...obj.classList);
    if (obj.event) // 如果有绑定事件
    {
        Object.keys(obj.event).forEach(key =>
        {
            if (obj.event[key])
                now.addEventListener(/** @type {keyof HTMLElementEventMap} */(key), obj.event[key]);
        });
    }
    if (obj.child) // 若有子元素
    {
        obj.child.forEach(o => // 遍历
        {
            if (o)
            {
                if (o instanceof NElement)
                    now.addChild(o);
                else
                    now.addChild(expEle(o));
            }
        });
    }
    if (obj.assembly)
    {
        obj.assembly.forEach(o =>
        {
            let e = o(now);
            if (e)
                now = e;
        });
    }
    return now;
}

/**
 * 遍历预处理
 * @param {EDObj} obj
 * @param {Object<string, any>} def
 * @returns {EDObj}
*/
function preC(obj, def)
{
    /**
     * 当前结果
     * @type {EDObj}
     */
    let now = {};
    /**
     * 缓存当前定义 之后回退
     * @type {EDObj}
     */
    let nowDef = {};
    Object.keys(def).forEach(key => now[key] = def[key]);
    Object.keys(obj).forEach(key =>
    {
        if (key != "child")
        {
            if (key[0] == "$")
            {
                let rKey = key.slice(1);
                nowDef[rKey] = def[rKey];
                now[rKey] = def[rKey] = obj[key];
            }
            else if (key.slice(-1) == "$")
            {
                let rKey = key.slice(0, -1);
                nowDef[rKey] = def[rKey];
                def[rKey] = obj[key];
            }
            else
                now[key] = obj[key];
        }
    });

    if (now.left && now.right && now.width)
        delete (now.width);
    if (now.top && now.bottom && now.height)
        delete (now.height);

    if (obj.child) // 若有子元素
    {
        /**
         * @type {Array<EDObj | NElement>}
        */
        now.child = [];
        obj.child.forEach(o => // 遍历
        {
            if (o)
            {
                if (o instanceof NElement)
                    now.child.push(o);
                else
                    now.child.push(preC(o, def));
            }
        });
    }
    Object.keys(nowDef).forEach(key => def[key] = nowDef[key]);
    return now;
}

/**
 * 展开元素
 * 将内容js对象转换为封装的HTML树
 * 请不要转换不受信任的json
 * @param {EDObj} obj EleData格式的对象
 * @returns {NElement}
*/
export function expandElement(obj)
{
    return expEle(preC(obj, {}));
}