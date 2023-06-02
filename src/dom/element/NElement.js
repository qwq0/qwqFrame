import { forEach, isAmong } from "../../util/forEach.js";
import { HookBindCallback, HookBindInfo, HookBindValue, bindValue } from "../../util/proxyHook.js";
import { NList } from "../feature/NList.js";

const symbolKey = Symbol("NElement");

/**
 * dom元素的封装
 * @template {HTMLElement} ElementObjectType
 */
export class NElement
{
    /**
     * 元素对象
     * @readonly
     * @type {ElementObjectType}
     */
    element = null;
    /**
     * 样式名 到 钩子绑定 映射
     * @private
     * @type {Map<string, HookBindValue | HookBindCallback>}
     */
    styleHooks = new Map();

    /**
     * @private
     * @param {ElementObjectType} elementObj
     */
    constructor(elementObj)
    {
        this.element = elementObj;
    }

    /**
     * 添加单个子节点
     * @param {NElement | Node | string | HookBindInfo} chi
     */
    addChild(chi)
    {
        if (chi instanceof NElement)
            this.element.appendChild(chi.element);
        else if (chi instanceof Node)
            this.element.appendChild(chi);
        else if (typeof (chi) == "string")
            this.addText(chi);
        else if (chi instanceof HookBindInfo)
        {
            let currentNode = null;
            {
                let initVal = chi.getValue();
                currentNode = (initVal == null ? new Comment() : (typeof (initVal) == "string" ? new Text(initVal) : (initVal instanceof NElement ? initVal.element : initVal)));
                this.element.appendChild(currentNode);
            }
            chi.bindToCallback(val =>
            {
                if (currentNode instanceof Text && typeof (val) == "string")
                {
                    currentNode.data = val;
                    return;
                }
                else
                {
                    let newNode = (val == null ? new Comment() : (typeof (val) == "string" ? new Text(val) : (val instanceof NElement ? val.element : val)));
                    this.element.replaceChild(newNode, currentNode);
                    currentNode = newNode;
                }
            }).bindDestroy(this);
        }
        else
            throw "(NElement) Type of child node that cannot be added";
    }

    /**
     * 添加多个子节点
     * @param {Array<NElement | Node | string | HookBindInfo | Array<NElement | Node | string | HookBindInfo>>} chi
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
        let e = this.element;
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
        let ind = -1;
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
        let e = this.element;
        if (end > e.childElementCount)
            end = e.childElementCount;
        for (let i = begin; i < end; i++)
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
     * @param {import("../feature/NStyle").keyOfStyle} styleName
     * @param {string | number | HookBindInfo} value
     * @param {HookBindValue | HookBindCallback} [hookObj]
     */
    setStyle(styleName, value, hookObj)
    {
        if (hookObj != this.styleHooks.get(styleName))
        {
            this.styleHooks.get(styleName)?.destroy();
            if (hookObj != undefined)
                this.styleHooks.set(styleName, hookObj);
            else
                this.styleHooks.delete(styleName);
        }
        if (value instanceof HookBindInfo)
            value.bindToCallback(o =>
            {
                this.setStyle(styleName, o, hookObj);
            }).bindDestroy(this).emit();
        else
            // @ts-expect-error
            this.element.style[styleName] = value;
    }
    /**
     * 获取样式
     * @param {import("../feature/NStyle").keyOfStyle} styleName
     * @returns {string | number}
     */
    getStyle(styleName)
    {
        if (typeof (styleName) == "string")
            return this.element.style[styleName];
    }

    /**
     * 修改多个样式
     * @param {{ [x in (import("../feature/NStyle").keyOfStyle)]?: string | number }} obj
     */
    setStyles(obj)
    {
        forEach(Object.keys(obj), (key) =>
        {
            let value = obj[key];
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
     * 添加文本
     * @param {string} text
     * @returns {Text}
     */
    addText(text)
    {
        return this.element.appendChild(document.createTextNode(text));
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
     * @param {function(NElement): void} asseFunc 流水线函数(无视返回值)
     * @returns {NElement} 返回本身
     */
    asse(asseFunc)
    {
        asseFunc(this);
        return this;
    }

    /**
     * 获取标签名
     * 标签名使用小写字母
     * @returns {keyof HTMLElementTagNameMap}
     */
    getTagName()
    {
        return (/** @type {keyof HTMLElementTagNameMap} */(this.element.tagName.toLowerCase()));
    }

    /**
     * 应用NList到元素
     * @param {NList | ConstructorParameters<typeof NList>[0]} list
     * @returns {NElement} 返回被操作的NElement
     */
    applyNList(list)
    {
        let nList = (list instanceof NList ? list : NList.flat(list));
        nList.apply(this);
        return this;
    }

    /**
     * 根据HTMLElement对象获取NElement对象
     * @template {HTMLElement} ElementObjectType
     * @param {ElementObjectType} element
     * @returns {NElement<ElementObjectType>}
     */
    static byElement(element)
    {
        if (element[symbolKey])
            return element[symbolKey];
        else if (element instanceof NElement)
            return element;
        else
            return element[symbolKey] = new NElement(element);
    }
}


/**
 * 根据HTMLElement对象获取NElement对象
 * @template {HTMLElement} ElementObjectType
 * @param {ElementObjectType} element
 * @returns {NElement<ElementObjectType>}
 */
export function getNElement(element)
{
    return NElement.byElement(element);
}