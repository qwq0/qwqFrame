/**
 * 键盘对应表
 */
let table = {
    "~": "`",
    "!": "1",
    "@": "2",
    "#": "3",
    "$": "4",
    "%": "5",
    "^": "6",
    "&": "7",
    "*": "8",
    "(": "9",
    ")": "0",
    "_": "-",
    "+": "=",
    "{": "[",
    "}": "]",
    "|": "\\",
    "\"": "\'",
    ":": ";",
    "<": ",",
    ">": ".",
    "?": "/"
};
let capitalA = "A".charCodeAt(0);
let lowercaseA = "a".charCodeAt(0);
for (let i = 0; i < 26; i++)
    table[String.fromCharCode(capitalA + i)] = String.fromCharCode(lowercaseA + i);
export { table };


let keyMap = new Map();
/**
 * 按下键时调用
 * @param {string} keyName
 * @returns {boolean}
 */
export function keyPress(keyName)
{
    if (keyMap.get(keyName))
        return false;
    keyMap.set(keyName, true);
    return true;
}
/**
 * 弹起键时调用
 * @param {string} keyName
 */
export function keyUp(keyName)
{
    keyMap.set(keyName, false);
}
