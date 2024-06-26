import { NElement, getNElement } from "../../node/NElement.js";
import { NEvent } from "../../feature/NEvent.js";
import { NStyle } from "../../feature/NStyle.js";

/**
 * 解析标签
 * @param {string} tagName
 * @param {TemplateStringsArray} strings
 * @typedef {NElement | NStyle | NEvent} parsingElementKeysType
 * @param {Array<parsingElementKeysType>} keys
 * @returns {NElement}
 */
function parsingElement(tagName, strings, ...keys)
{
    let ret = getNElement(document.createElement(tagName));
    for (let i = 0; i < strings.length; i++)
    {
        let text = strings[i].trim();
        if (text)
            ret.node.appendChild(document.createTextNode(text));
        if (keys[i])
        {
            let nowKey = keys[i];
            if (nowKey instanceof NElement)
                ret.addChild(nowKey);
            else if (nowKey instanceof NStyle || nowKey instanceof NEvent)
                nowKey.apply(ret);
            else if (nowKey)
                throw "parsingElement error: Unprocessed type";
        }
    }
    return ret;
}

/**
 * 解析标签
 * 默认为div标签
 * @deprecated
 * @param {TemplateStringsArray} strings
 * @param {Array<parsingElementKeysType>} keys
 * @returns {NElement}
 */
export function tag(strings, ...keys)
{
    return parsingElement("div", strings, ...keys);
}

/**
 * 解析指定标签名的标签
 * @deprecated
 * @param {string} name
 * @returns {function(TemplateStringsArray, ...parsingElementKeysType): NElement}
 */
export function tagName(name)
{
    return parsingElement.bind(null, name);
}