/**
 * 正向遍历数组
 * 在回调中返回不为false或void的值主动结束遍历
 * 主动结束遍历 返回true
 * 未主动结束遍历完全部内容 返回false
 * @template T
 * @param {ArrayLike<T>} o
 * @param {function(T, number):(boolean | void)} callback
 * @returns {boolean}
 */
function forEach(o, callback)
{
    if (!o)
        return false;
    for (var i = 0, Li = o.length; i < Li; i++)
        if (o[i] != undefined && callback(o[i], i))
            return true;
    return false;
}

/**
 * 判断第一个参数是否属于之后所有的参数
 * 第一个参数与任何一个之后的参数相等 返回true
 * 与任何一个都不相等 返回false
 * @param {any} k
 * @param  {...any} s
 * @returns {boolean}
 */
function isAmong(k, ...s)
{
    return forEach(s, o => o == k);
}

/**
 * dom元素的封装
 * @template {HTMLElement} ElementObjectType
 */
class NElement
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
     * @param {NElement} chi
     */
    addChild(chi)
    {
        this.element.appendChild(chi.element);
    }

    /**
     * 添加多个子节点
     * @param {Array<NElement | Array<NElement>>} chi
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
     * @param {"block" | "inline" | "none" | "inline-block" | string} s
     */
    setDisplay(s)
    {
        this.setStyle("display", s);
    }

    /**
     * 添加事件监听器
     * @param {string} eventName
     * @param {function(Event) : void} callBack
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
}

const symbolKey = Symbol("NElement");
/**
 * 根据HTMLElement对象获取NElement对象
 * 如果没有则生成
 * @template {HTMLElement} ElementObjectType
 * @param {ElementObjectType} element
 * @returns {NElement<ElementObjectType>}
 */
function getNElement(element)
{
    if(element[symbolKey])
        return element[symbolKey];
    else
        return element[symbolKey] = new NElement(element);
}

/**
 * css生成
 * @namespace
 */
const cssG = {
    /**
     * 100%减去指定值
     * @param {string} value
     * @returns {string}
     */
    diFull: (value) =>
    {
        return ("calc(100% - " + value + ")");
    },

    /**
     * 构建rgb或rgba颜色颜色
     * @param {number | string} r 0~255
     * @param {number | string} g 0~255
     * @param {number | string} b 0~255
     * @param {number | string} [a] 0~1
     */
    rgb: (r, g, b, a = 1) =>
    {
        return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    }
};

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
 *     style?: Object<keyof CSSStyleDeclaration, string | number>, // 样式对象
 *     attr?: Object<string, string>, // 属性对象(HTMLElement的附加属性)
 *     event?: Object<string, function(Event) : void>, // 事件绑定
 *     child?: Array<EDObj | NElement>, // 子节点
 *     assembly?: Array<function(NElement) : void | NElement>, // 流水线
 *     [x: string]: any
 * }} EDObj
 * @param {EDObj} obj
 * @returns {NElement}
*/
function expEle(obj)
{
    var now = getNElement(document.createElement(obj.tagName ? obj.tagName : "div"));

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
            now.setStyle(key, obj[key]);
    });

    if (obj.style)
        now.setStyles(obj.style);
    if (obj.text)
        now.setText(obj.text);
    if (obj.attr)
        now.setAttrs(obj.attr);
    if (obj.classList)
        now.element.classList.add(...obj.classList);
    if (obj.event) // 如果有绑定事件
    {
        Object.keys(obj.event).forEach(key => now.addEventListener(key, obj.event[key]));
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
            var e = o(now);
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
    var now = {};
    /**
     * 缓存当前定义 之后回退
     * @type {EDObj}
     */
    var nowDef = {};
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
function expandElement(obj)
{
    return expEle(preC(obj, {}));
}

/**
 * 事件
 * @template {keyof HTMLElementEventMap} T
 */
class NEvent
{
    /**
     * @type {T}
     */
    key = null;
    /**
     * @type {function(Event) : void}
     */
    callback = null;

    /**
     * @param {T} key
     * @param {function(Event) : void} callback
     */
    constructor(key, callback)
    {
        this.key = key;
        this.callback = callback;
    }
}

/**
 * 样式
 * @template {keyof CSSStyleDeclaration} T
 */
class NStyle
{
    /**
     * @type {T}
     */
    key = null;
    /**
     * @type {CSSStyleDeclaration[T]}
     */
    value = null;

    /**
     * @param {T} key
     * @param {CSSStyleDeclaration[T]} value
     */
    constructor(key, value)
    {
        this.key = key;
        this.value = value;
    }
}

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
function tag(strings, ...keys)
{
    return parsingElement("div", strings, ...keys);
}

/**
 * 解析指定标签名的标签
 * @param {string} name
 * @returns {function(TemplateStringsArray, ...parsingElementKeysType): NElement}
 */
function tagName(name)
{
    return parsingElement.bind(null, name);
}

/**
 * 包装为仅能执行一次的函数
 * @template P
 * @template R
 * @template {function(...P) : R} T
 * @param {T} func
 * @returns {T}
 */
function runOnce(func)
{
    var runned = false;
    return /** @type {T} */ ((...para) =>
    {
        if (runned)
            return null;
        else
        {
            runned = true;
            return func(...para);
        }
    });
}

export { NElement, NEvent, NStyle, cssG, expandElement, getNElement, runOnce, tag, tagName };
//# sourceMappingURL=qframe.js.map
