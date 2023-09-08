import { keyPress, keyUp, table } from "./keyboardTable.js";
import { KeyData } from "./keyData.js";

/**
 * 键盘 事件处理
 * @param {HTMLElement} element
 * @param {function(KeyData) : void} callBack
 */
export function keyboardBind(element, callBack)
{
    element.addEventListener("keydown", e =>
    {
        let keyName = (table[e.key] ? table[e.key] : e.key);
        callBack(new KeyData(
            keyName,
            true,
            keyPress(keyName)
        ))
    });
    element.addEventListener("keyup", e =>
    {
        let keyName = (table[e.key] ? table[e.key] : e.key);
        keyUp(keyName);
        callBack(new KeyData(
            keyName,
            false,
            false
        ))
    });
}