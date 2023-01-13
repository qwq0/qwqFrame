import { getNElement, NElement } from "../element/NElement.js";
import { NAsse } from "./NAsse.js";
import { NAttr } from "./NAttr.js";
import { NEvent } from "./NEvent.js";
import { NStyle } from "./NStyle.js";
import { NTagName } from "./NTagName.js";

/**
 * 特征列表
 * @typedef {Array<string | NTagName | NStyle | NAttr | NEvent | NAsse | NList | NList_list | NElement>} NList_list
 */
export class NList
{
    /**
     * @type {NList_list}
     */
    list = null;
    /**
     * 拉平特征
     * (默认)标记为false将作为子元素节点
     * 标记为true将作为上层节点的特征列表
     * @type {boolean}
     */
    flatFlag = false;

    /**
     * @param {NList_list} list
     */
    constructor(list)
    {
        this.list = list;
    }

    /**
     * 为元素应用特征列表
     * @param {NElement<HTMLElement>} element
     */
    apply(element)
    {
        let tagName = element.getTagName();
        this.list.forEach(o =>
        {
            if (typeof (o) == "string") // 内部文本
                element.addText(o);
            else if (o instanceof NTagName) // 标签名
            {
                if (tagName != o.tagName)
                    throw "(NList) The feature tagName does not match the element";
            }
            else if (
                (o instanceof NStyle) || // 样式
                (o instanceof NAttr) || // 元素属性
                (o instanceof NEvent) || // 事件
                (o instanceof NAsse) // 流水线
            )
                o.apply(element);
            else if (o instanceof NElement) // 子元素
                element.addChild(o);
            else if (o instanceof NList) // 子列表
            {
                if (o.flatFlag) // 子特征(列表)
                    o.apply(element);
                else // 子元素(列表)
                    element.addChild(o.getElement());
            }
            else if (Array.isArray(o)) // 子元素(列表)
                element.addChild(NList.getElement(o));
            else
                throw "(NList) Untractable feature types were found";
        });
    }

    /**
     * 获取列表的标签名
     * @returns {string}
     */
    getTagName()
    {
        let ret = "";
        this.list.forEach(o =>
        {
            let tagName = "";
            if (o instanceof NTagName)
                tagName = o.tagName;
            else if ((o instanceof NList) && o.flatFlag)
                tagName = o.getTagName();
            if (tagName)
            {
                if (!ret)
                    ret = tagName;
                else if (ret != tagName)
                    throw "(NList) Multiple TagNames exist in a feature list";
            }
        });
        return ret;
    }

    /**
     * 获取(生成)元素
     * @returns {NElement}
     */
    getElement()
    {
        let tagName = this.getTagName();
        if (tagName == "")
            tagName = "div";
        let ele = getNElement(document.createElement(tagName));
        this.apply(ele);
        return ele;
    }

    /**
     * 生成拉平列表
     * @param {NList_list} list
     */
    static flat(list)
    {
        let ret = new NList(list);
        ret.flatFlag = true;
        return ret;
    }

    /**
     * 获取(生成)元素
     * @param {NList_list} list
     */
    static getElement(list)
    {
        return (new NList(list)).getElement();
    }
}