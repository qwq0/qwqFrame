import { NElement } from "../../element/NElement.js";
import { PointerData } from "./PointerData.js";

/**
 * 鼠标(拖拽)事件处理
 * @param {NElement} element 绑定到元素
 * @param {function(PointerData):void} callBack 回调
 * @param {number} [button] 绑定的按键
 * @param {HTMLElement | Window} [extensionRegion] 延伸区域 (实际捕获鼠标移动和按钮抬起的区域)
 */
export function mouseBind(element, callBack, button = 0, extensionRegion = window)
{
    element.addEventListener("mousedown", (/** @type {MouseEvent} */ e) => mouseDown(e), false);

    let mousemoveP = (/** @type {MouseEvent} */ e) => mouseMove(e);
    let mouseupP = (/** @type {MouseEvent} */ e) => mouseUp(e);

    let x = 0, y = 0;
    let sx = 0, sy = 0;
    let leftDown = false;
    /**
     * 鼠标处理函数(按下)
     * @param {MouseEvent} e 
     */
    function mouseDown(e)
    {
        if (e.cancelable)
            e.preventDefault();
        sx = x = e.clientX;
        sy = y = e.clientY;
        extensionRegion.addEventListener("mousemove", mousemoveP, true);
        extensionRegion.addEventListener("mouseup", mouseupP, true);
        if (e.button == button)
        {
            leftDown = true;
            callBack(new PointerData(
                x, y,
                0, 0,
                x, y,
                true, true
            ));
        }
    }
    /**
     * 鼠标处理函数(移动)
     * @param {MouseEvent} e 
     */
    function mouseMove(e)
    {
        if (leftDown)
        {
            // e.preventDefault();
            let vx = e.clientX - x;
            let vy = e.clientY - y;
            x = e.clientX;
            y = e.clientY;
            callBack(new PointerData(
                x, y,
                vx, vy,
                sx, sy,
                true, false
            ));
        }
    }
    /**
     * 鼠标处理函数(松开)
     * @param {MouseEvent} e 
     */
    function mouseUp(e)
    {
        let vx = e.clientX - x;
        let vy = e.clientY - y;
        x = e.clientX;
        y = e.clientY;
        extensionRegion.removeEventListener("mousemove", mousemoveP, false);
        extensionRegion.removeEventListener("mouseup", mouseupP, false);
        if (leftDown && e.button == button)
        {
            leftDown = false;
            callBack(new PointerData(
                x, y,
                vx, vy,
                sx, sy,
                false, false
            ));
        }
    }
}