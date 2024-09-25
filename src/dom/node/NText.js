import { NElement } from "./NElement.js";

/**
 * Text节点的封装
 * 用于进行节点定位
 * @typedef {import("./NLocate").NLocate} NLocate
 */
export class NText
{
    /**
     * Text节点
     * @type {Text}
     */
    node = null;

    /**
     * @param {string | Text} text
     */
    constructor(text)
    {
        if (text instanceof Text)
            this.node = text;
        else
        {
            this.node = new Text();
            if (text)
                this.setText(text);
        }
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
     * 设置此文本节点的文本
     * @param {string} text 
     */
    setText(text)
    {
        this.node.data = text;
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
     * 使用指定节点替换此节点
     * @param {Array<NElement | NText | NLocate>} elements
     */
    replaceWith(...elements)
    {
        this.node.replaceWith(...(elements.map(o => o.node)));
    }
}