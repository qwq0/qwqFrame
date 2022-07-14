import { getNElement } from "../element/getNElement.js";
import { NElement } from "../element/NElement.js";
import { NEvent } from "../event/NEvent.js";
import { NStyle } from "../style/NStyle.js";

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
    var ret = getNElement(document.createElement(tagName));
    for (var i = 0; i < strings.length; i++)
    {
        var text = strings[i].trim();
        if (text)
            ret.element.appendChild(document.createTextNode(text));
        if (keys[i])
        {
            var nowKey = keys[i];
            if (nowKey instanceof NElement)
                ret.addChild(nowKey);
            else if (nowKey instanceof NStyle)
                ret.setStyle(nowKey.key, nowKey.value);
            else if (nowKey instanceof NEvent)
                ret.addEventListener(nowKey.key, nowKey.callback);
            else if (nowKey)
                throw "parsingElement error: Unprocessed type";
        }
    }
    return ret;
}

/**
 * 解析标签
 * 默认为div标签
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
 * @param {string} name
 * @returns {function(TemplateStringsArray, ...parsingElementKeysType): NElement}
 */
export function tagName(name)
{
    return parsingElement.bind(null, name);
}