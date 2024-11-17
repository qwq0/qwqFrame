import { forEach, isAmong } from "../../util/forEach.js";
import { HookBindInfo } from "../../data/hook/object/HookBindInfo.js";
import { HookBindValue } from "../../data/hook/object/HookBindValue.js";
import { HookBindCallback } from "../../data/hook/object/HookBindCallback.js";
import { NList } from "../feature/NList.js";
import { NLocate } from "./NLocate.js";
import { NText } from "./NText.js";

/**
 * NElement的symbol
 * 用于将NElement绑定到对应的HTMLElement
 */
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
    node = null;
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
        this.node = elementObj;
    }

    /**
     * @returns {ElementObjectType}
     */
    get element()
    {
        return this.node;
    }

    /**
     * 获取父元素
     * @returns {NElement}
     */
    getParent()
    {
        return NElement.byElement(this.node.parentElement);
    }

    /**
     * 添加单个子节点
     * @param {NElement | NLocate | NText | Node | string | HookBindInfo} chi
     */
    addChild(chi)
    {
        if (
            chi instanceof NElement ||
            chi instanceof NLocate ||
            chi instanceof NText
        )
            this.node.appendChild(chi.node);
        else if (chi instanceof Node)
            this.node.appendChild(chi);
        else if (typeof (chi) == "string")
            this.addText(chi);
        else if (chi instanceof HookBindInfo)
        {
            /** @type {NElement | NText | NLocate} */
            let currentNode = null;

            let initVal = chi.getValue();
            currentNode = (initVal == null ? new NLocate() : (typeof (initVal) == "string" ? new NText(initVal) : initVal));
            this.node.appendChild(currentNode.node);

            chi.bindToCallback(val =>
            {
                if (currentNode instanceof NText && typeof (val) == "string")
                {
                    currentNode.setText(val);
                    return;
                }
                else
                {
                    let newNode = (val == null ? new NLocate() : (typeof (val) == "string" ? new NText(val) : val));
                    currentNode.replaceWith(newNode);
                    currentNode = newNode;
                }
            }).bindDestroy(this);
        }
        else
            throw "(NElement) Type of child node that cannot be added";
    }

    /**
     * 添加多个子节点
     * @param {Array<Parameters<NElement["addChild"]>[0] | Array<Parameters<NElement["addChild"]>[0]>>} chi
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
     * @param {NElement | NLocate | NText} chi
     * @param {number | NElement | NLocate | NText} pos 添加到的位置 负数从后到前 超过范围添加到最后
     */
    insChild(chi, pos)
    {
        let e = this.node;
        if (typeof (pos) == "number")
        {
            if (pos >= 0 || pos < e.childElementCount)
            {
                e.insertBefore(chi.node, e.children[pos]);
            }
            else if (pos < 0 || pos >= (-e.childElementCount))
            {
                e.insertBefore(chi.node, e.children[e.childElementCount + pos]);
            }
            else
            {
                e.appendChild(chi.node);
            }
        }
        else
            e.insertBefore(chi.node, pos.node);
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
        forEach(this.node.children, (o, i) =>
        {
            if (o == chi.node)
            {
                ind = i;
                return true;
            }
        });
        return ind;
    }

    /**
     * 在此节点之前插入节点
     * @param {NElement | NLocate | NText} target
     */
    insBefore(target)
    {
        this.node.before(target.node);
    }

    /**
     * 在此节点之后插入节点
     * @param {NElement | NLocate | NText} target
     */
    insAfter(target)
    {
        this.node.after(target.node);
    }

    /**
     * 移除此节点
     */
    remove()
    {
        this.node.remove();
    }

    /**
     * 移除此节点的子节点
     * @param {number} [begin] 开始删除的子节点下标 缺省则为从0开始
     * @param {number} [end] 结束删除的子节点下标 不包含end 缺省则为到结尾
     */
    removeChilds(begin = 0, end = Infinity)
    {
        let e = this.node;
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
        return Array.from(this.node.children).map(o => NElement.byElement(/** @type {HTMLElement} */(o)));
    }

    /**
     * 获取第ind个子节点
     * @param {number} ind
     * @returns {NElement}
     */
    getChild(ind)
    {
        return NElement.byElement(/** @type {HTMLElement} */(this.node.children[ind]));
    }

    /**
     * 使用指定节点替换此节点
     * @param {Array<NElement | NText | NLocate>} elements
     */
    replaceWith(...elements)
    {
        this.node.replaceWith(...(elements.map(o => o.node)));
    }

    /**
     * 修改样式
     * @param {import("../feature/NStyle.js").keyOfStyle} styleName
     * @param {string | number | HookBindInfo} value
     */
    setStyle(styleName, value)
    {
        if (this.styleHooks.has(styleName))
        {
            this.styleHooks.get(styleName)?.destroy();
            this.styleHooks.delete(styleName);
        }

        if (value instanceof HookBindInfo)
        {
            let hookBind = value.bindToValue(this.node.style, styleName);
            this.styleHooks.set(styleName, hookBind);
            hookBind.emit();
        }
        else
            // @ts-expect-error
            this.node.style[styleName] = value;
    }

    /**
     * 获取样式
     * @param {import("../feature/NStyle.js").keyOfStyle} styleName
     * @returns {string | number}
     */
    getStyle(styleName)
    {
        if (typeof (styleName) == "string")
            return this.node.style[styleName];
    }

    /**
     * 修改多个样式
     * @param {{ [x in (import("../feature/NStyle.js").keyOfStyle)]?: string | number | HookBindInfo }} obj
     */
    setStyles(obj)
    {
        forEach(Object.keys(obj), (key) => { this.setStyle(key, obj[key]); });
    }

    /**
     * 修改文本
     * @param {string} text
     */
    setText(text)
    {
        this.node.innerText = text;
    }

    /**
     * 添加文本
     * @param {string} text
     * @returns {Text}
     */
    addText(text)
    {
        return this.node.appendChild(document.createTextNode(text));
    }

    /**
     * 设置HTMLElement属性
     * @param {string} key
     * @param {string} value
     */
    setAttr(key, value)
    {
        this.node.setAttribute(key, value);
    }

    /**
     * 设置多个HTMLElement属性
     * @param {Object<string, string>} obj
     */
    setAttrs(obj)
    {
        forEach(Object.keys(obj), (key) => { this.setAttr(key, obj[key]); });
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
     * @param {function(HTMLElementEventMap[K]): any} callback
     * @param {boolean | AddEventListenerOptions} [options]
     */
    addEventListener(eventName, callback, options)
    {
        this.node.addEventListener(eventName, callback, options);
    }

    /**
     * 移除事件监听器
     * @param {string} eventName
     * @param {function(Event) : void} callback
     * @param {boolean | EventListenerOptions} [options]
     */
    removeEventListener(eventName, callback, options)
    {
        this.node.removeEventListener(eventName, callback, options);
    }

    /**
     * 执行动画
     * @param {Array<Keyframe> | PropertyIndexedKeyframes} keyframes
     * @param {number | KeyframeAnimationOptions} options
     * @returns {Animation}
     */
    animate(keyframes, options)
    {
        return this.node.animate(keyframes, options);
    }

    /**
     * 执行动画并提交
     * 在执行完成动画后将最后的效果提交到style
     * @param {Array<Keyframe> | PropertyIndexedKeyframes} keyframes
     * @param {number | KeyframeAnimationOptions} options
     * @returns {Promise<void>} 动画执行完后返回
     */
    async animateCommit(keyframes, options)
    {
        if (typeof (options) == "number")
            options = {
                duration: options,
                fill: "forwards"
            };
        else
            options = Object.assign({ fill: "forwards" }, options);
        if (options.fill != "forwards" && options.fill != "both")
            throw "(NElelemt) animateCommit can only be used when fill forwards or both";
        let animate = this.node.animate(keyframes, options);
        await animate.finished;

        let errorObject = null;
        try
        {
            animate.commitStyles();
        }
        catch (err)
        {
            errorObject = err;
        }
        animate.cancel();
        if (errorObject != null)
        {
            console.error(errorObject);
        }
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
        return (/** @type {keyof HTMLElementTagNameMap} */(this.node.tagName.toLowerCase()));
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