import { HookBindInfo } from "../../data/hook/object/HookBindInfo.js";
import { getNElement, NElement } from "../node/NElement.js";
import { NLocate } from "../node/NLocate.js";
import { NText } from "../node/NText.js";
import { NAsse } from "./NAsse.js";
import { NAttr } from "./NAttr.js";
import { NEvent } from "./NEvent.js";
import { NStyle } from "./NStyle.js";
import { NTagName } from "./NTagName.js";

/**
 * 特征列表
 * @typedef {Array<string | HookBindInfo | NTagName | NStyle | NAttr | NEvent | NAsse | NList | NList_list | NElement | NText | NLocate | ((e: NElement) => void)>} NList_list
 * @typedef {NList_list[number]} NList_item
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
        const tagName = element.getTagName();
        this.list.forEach(o =>
        {
            if (o == undefined)
                return;
            if (typeof (o) == "string") // 内部文本
            {
                element.addText(o);
            }
            else if (typeof (o) == "function") // 流水线函数
            {
                o(element);
            }
            else if (typeof (o) == "object")
            {
                switch (Object.getPrototypeOf(o)?.constructor)
                {
                    case HookBindInfo: { // 子元素或文本
                        element.addChild(/** @type {HookBindInfo} */(o));
                        break;
                    }

                    case NTagName: { // 标签名
                        if (tagName != (/** @type {NTagName} */(o)).tagName)
                            throw "(NList) The feature tagName does not match the element";
                        break;
                    }

                    case NStyle: // 样式
                    case NAttr: // 元素属性
                    case NEvent: // 事件
                    case NAsse: { // 流水线
                        (/** @type {NStyle | NAttr | NEvent | NAsse} */(o)).apply(element);
                        break;
                    }

                    case NElement: // 子元素
                    case NLocate: // 定位节点
                    case NText: { // 子文本节点
                        element.addChild(/** @type {NElement | NLocate | NText} */(o));
                        break;
                    }

                    case NList: { // 子列表
                        const childList = (/** @type {NList} */(o));
                        if (childList.flatFlag) // 子特征(列表)
                            childList.apply(element);
                        else // 子元素(列表)
                            element.addChild(childList.getElement());
                        break;
                    }

                    case Array: { // 子元素(列表)
                        element.addChild(NList.getElement((/** @type {Array} */(o))));
                        break;
                    }

                    default:
                        throw "(NList) Untractable feature types were found";
                }
            }
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
     * @param {NList_list | NList} list
     */
    static getElement(list)
    {
        if (list instanceof NList)
            return list.getElement();
        else
            return (new NList(list)).getElement();
    }
}