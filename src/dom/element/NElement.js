import { forEach, isAmong } from "../../util/forEach.js";

/**
 * dom元素的封装
 * @template {HTMLElement} ElementObjectType
 */
export class NElement
{
    /**
     * @type {ElementObjectType}
     */
    element = null;

    /**
     * @param {ElementObjectType} elementObj
     */
    constructor(elementObj)
    {
        this.element = elementObj;
    }

    /**
     * 添加单个子节点
     * @param {NElement | HTMLElement} chi
     */
    addChild(chi)
    {
        if (chi instanceof NElement)
            this.element.appendChild(chi.element);
        else
            this.element.appendChild(chi);
    }

    /**
     * 添加多个子节点
     * @param {Array<NElement | HTMLElement | Array<NElement | HTMLElement>>} chi
     */
    addChilds(...chi)
    {
        chi.forEach(o =>
        {
            if (Array.isArray(o))
                o.forEach(s => this.addChild(s));
            else if (typeof (o) == "object")
                this.addChild(o);
        });
    }

    /**
     * 插入单个子节点(在中间)
     * 如果此节点之前在树中则先移除后加入
     * @param {NElement} chi
     * @param {number | NElement} pos 添加到的位置 负数从后到前 超过范围添加到最后
     */
    insChild(chi, pos)
    {
        var e = this.element;
        if (typeof (pos) == "number")
        {
            if (pos >= 0 || pos < e.childElementCount)
            {
                e.insertBefore(chi.element, e.children[pos]);
            }
            else if (pos < 0 || pos >= (-e.childElementCount))
            {
                e.insertBefore(chi.element, e.children[e.childElementCount + pos]);
            }
            else
            {
                e.appendChild(chi.element);
            }
        }
        else
            e.insertBefore(chi.element, pos.element);
    }

    /**
     * 查找子节点在当前节点中的位置
     * 从0开始
     * 不是子节点则返回-1
     * @param {NElement} chi
     * @returns {number}
     */
    childInd(chi)
    {
        var ind = -1;
        forEach(this.element.children, (o, i) =>
        {
            if (o == chi.element)
            {
                ind = i;
                return true;
            }
        });
        return ind;
    }

    /**
     * 移除此节点
     */
    remove()
    {
        this.element.remove();
    }

    /**
     * 移除此节点的子节点
     * @param {number} [begin] 开始删除的子节点下标 缺省则为从0开始
     * @param {number} [end] 结束删除的子节点下标 不包含end 缺省则为到结尾
     */
    removeChilds(begin = 0, end = Infinity)
    {
        var e = this.element;
        if (end > e.childElementCount)
            end = e.childElementCount;
        for (var i = begin; i < end; i++)
            e.children[begin].remove();
    }

    /**
     * 获取子节点列表
     * 返回的列表不会随dom树变化
     * @returns {Array<NElement>}
     */
    getChilds()
    {
        return Array.from(this.element.children).map(o => getNElement(/** @type {HTMLElement} */(o)));
    }

    /**
     * 获取第ind个子节点
     * @param {number} ind
     * @returns {NElement}
     */
    getChild(ind)
    {
        return getNElement(/** @type {HTMLElement} */(this.element.children[ind]));
    }

    /**
     * 修改样式
     * @param {keyof CSSStyleDeclaration | string} styleName
     * @param {string | number} value
     */
    setStyle(styleName, value)
    {
        this.element.style[styleName] = value;
    }

    /**
     * 获取样式
     * @param {keyof CSSStyleDeclaration | string} styleName
     * @returns {string | number}
     */
    getStyle(styleName)
    {
        if (typeof (styleName) == "string")
            return this.element.style[styleName];
    }

    /**
     * 修改多个样式
     * @param {Object<keyof CSSStyleDeclaration | string, string | number>} obj
     */
    setStyles(obj)
    {
        forEach(Object.keys(obj), (key) =>
        {
            var value = obj[key];
            if (isAmong(typeof (value), "number", "string"))
                this.element.style[key] = obj[key];
        });
    }

    /**
     * 修改文本
     * @param {string} text
     */
    setText(text)
    {
        this.element.innerText = text;
    }

    /**
     * 设置多个HTMLElement属性
     * @param {Object<string, string>} obj
     */
    setAttrs(obj)
    {
        forEach(Object.keys(obj), (key) => { this.element[key] = obj[key]; });
    }

    /**
     * 设置元素可见性
     * @param {"block" | "inline" | "flex" | "none" | "inline-block" | string} s
     */
    setDisplay(s)
    {
        this.setStyle("display", s);
    }

    /**
     * 添加事件监听器
     * @template {keyof HTMLElementEventMap} K
     * @param {K} eventName
     * @param {function(HTMLElementEventMap[K]): any} callBack
     * @param {boolean | AddEventListenerOptions} [options]
     */
    addEventListener(eventName, callBack, options)
    {
        this.element.addEventListener(eventName, callBack, options);
    }

    /**
     * 移除事件监听器
     * @param {string} eventName
     * @param {function(Event) : void} callBack
     * @param {boolean | EventListenerOptions} [options]
     */
    removeEventListener(eventName, callBack, options)
    {
        this.element.removeEventListener(eventName, callBack, options);
    }

    /**
     * 执行动画
     * @param {Array<Keyframe> | PropertyIndexedKeyframes} keyframes
     * @param {number | KeyframeAnimationOptions} options
     */
    animate(keyframes, options)
    {
        this.element.animate(keyframes, options);
    }

    /**
     * 流水线
     * @param {function(typeof this): void} asseFunc 流水线函数(无视返回值)
     * @returns {NElement} 返回本身
     */
    asse(asseFunc)
    {
        asseFunc(this);
        return this;
    }
}

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
    if (element[symbolKey])
        return element[symbolKey];
    else
        return element[symbolKey] = new NElement(element);
}