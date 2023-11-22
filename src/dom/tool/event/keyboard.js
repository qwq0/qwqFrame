import { keyPress, keyUp, keyNameTable } from "./keyboardTable.js";
import { KeyboardData } from "./KeyboardData.js";

/**
 * 键盘 事件处理
 * @param {HTMLElement} element
 * @param {function(KeyboardData) : void} callBack
 */
export function keyboardBind(element, callBack)
{
    element.addEventListener("keydown", e =>
    {
        let keyName = (keyNameTable[e.key] ? keyNameTable[e.key] : e.key);
        callBack(new KeyboardData(
            keyName,
            true,
            keyPress(keyName)
        ))
    });
    element.addEventListener("keyup", e =>
    {
        let keyName = (keyNameTable[e.key] ? keyNameTable[e.key] : e.key);
        keyUp(keyName);
        callBack(new KeyboardData(
            keyName,
            false,
            false
        ))
    });
}