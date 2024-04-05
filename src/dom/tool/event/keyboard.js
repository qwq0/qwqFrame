import { keyPress, keyUp, keyNameTable } from "./keyboardTable.js";
import { KeyboardData } from "./KeyboardData.js";

/**
 * 键盘 事件处理
 * @param {HTMLElement} element
 * @param {function(KeyboardData) : void} callback
 */
export function keyboardBind(element, callback)
{
    element.addEventListener("keydown", e =>
    {
        let keyName = (keyNameTable[e.key] ? keyNameTable[e.key] : e.key);
        callback(new KeyboardData(
            keyName,
            true,
            keyPress(keyName)
        ))
    });
    element.addEventListener("keyup", e =>
    {
        let keyName = (keyNameTable[e.key] ? keyNameTable[e.key] : e.key);
        keyUp(keyName);
        callback(new KeyboardData(
            keyName,
            false,
            false
        ))
    });
}