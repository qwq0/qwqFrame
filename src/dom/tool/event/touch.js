import { forEach } from "../../../util/forEach.js";
import { NElement } from "../../node/NElement.js";
import { PointerData } from "./PointerData.js";

/**
 * 触摸(拖拽) 事件处理
 * @param {NElement} element 
 * @param {function(PointerData):void} callBack
 * @param {boolean} [preventDefault]
 */
export function touchBind(element, callBack, preventDefault = true)
{
    element.addEventListener("touchstart", e => touchStart(/** @type {TouchEvent} */(e)), {
        capture: false,
        passive: false
    });
    element.addEventListener("touchmove", e => touchMove(/** @type {TouchEvent} */(e)), {
        capture: false,
        passive: true
    });
    element.addEventListener("touchend", e => touchEnd(/** @type {TouchEvent} */(e)), {
        capture: false,
        passive: true
    });
    element.addEventListener("touchcancel", e => touchCancel(/** @type {TouchEvent} */(e)), {
        capture: false,
        passive: true
    });

    /**
     * 触摸点id 到 触摸点信息 映射
     * @type {Map<number, {
     *  id: number,
     *  sx: number,
     *  sy: number,
     *  x: number,
     *  y: number
     * }>}
     */
    let touchesSet = new Map();

    /**
     * 触摸处理函数(按下)
     * @param {TouchEvent} e 
     */
    function touchStart(e)
    {
        if (e.cancelable && preventDefault)
            e.preventDefault();
        forEach(e.changedTouches, o =>
        {
            let t = {
                id: o.identifier,
                sx: o.clientX,
                sy: o.clientY,
                x: o.clientX,
                y: o.clientY
            };
            touchesSet.set(o.identifier, t);
            callBack(new PointerData(
                t.x, t.y,
                0, 0,
                t.sx, t.sy,
                true, true
            ));
        });
    }

    /**
     * 触摸处理函数(移动)
     * @param {TouchEvent} e 
     */
    function touchMove(e)
    {
        forEach(e.changedTouches, o =>
        {
            let touchInfo = touchesSet.get(o.identifier);
            if (touchInfo)
            {
                let vx = o.clientX - touchInfo.x;
                let vy = o.clientY - touchInfo.y;
                touchInfo.x = o.clientX;
                touchInfo.y = o.clientY;
                callBack(new PointerData(
                    touchInfo.x, touchInfo.y,
                    vx, vy,
                    touchInfo.sx, touchInfo.sy,
                    true, false
                ));
            }
        });
    }

    /**
     * 触摸处理函数(松开)
     * @param {TouchEvent} e 
     */
    function touchEnd(e)
    {
        forEach(e.changedTouches, o =>
        {
            let touchInfo = touchesSet.get(o.identifier);
            if (touchInfo)
            {
                touchesSet.delete(o.identifier);
                let vx = o.clientX - touchInfo.x;
                let vy = o.clientY - touchInfo.y;
                touchInfo.x = o.clientX;
                touchInfo.y = o.clientY;
                callBack(new PointerData(
                    touchInfo.x, touchInfo.y,
                    vx, vy,
                    touchInfo.sx, touchInfo.sy,
                    false, false
                ));
            }
        });
    }

    /**
     * 触摸处理函数(触摸取消)
     * @param {TouchEvent} e 
     */
    function touchCancel(e)
    {
        forEach(e.changedTouches, o =>
        {
            let touchInfo = touchesSet.get(o.identifier);
            if (touchInfo)
            {
                touchesSet.delete(o.identifier);
                callBack(new PointerData(
                    touchInfo.x, touchInfo.y,
                    0, 0,
                    touchInfo.sx, touchInfo.sy,
                    false, false
                ));
            }
        });
    }
}