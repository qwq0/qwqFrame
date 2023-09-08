import { forEach } from "../../../util/forEach.js";
import { NElement } from "../../element/NElement.js";
import { PointerData } from "./pointerData.js";

/**
 * 触摸(拖拽) 事件处理
 * @param {NElement} element 
 * @param {function(PointerData):void} callBack
 */
export function touchBind(element, callBack)
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

    /**
     * @type {Array<{
     *  id: number,
     *  sx: number,
     *  sy: number,
     *  x: number,
     *  y: number
     * }>}
     */
    let ogTouches = [];
    /**
     * 通过标识符取触摸点数据索引
     * @param {any} id
     * @returns {number}
     */
    function getTouchesInd(id)
    {
        let ret = -1;
        ogTouches.forEach((o, i) =>
        {
            if (id == o.id)
                ret = i;
        });
        return ret;
    }
    /**
     * 触摸处理函数(按下)
     * @param {TouchEvent} e 
     */
    function touchStart(e)
    {
        if (e.cancelable)
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
            ogTouches.push(t);
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
            let ind = getTouchesInd(o.identifier);
            if (ind > -1)
            {
                let t = ogTouches[ind];
                let vx = o.clientX - t.x;
                let vy = o.clientY - t.y;
                t.x = o.clientX;
                t.y = o.clientY;
                callBack(new PointerData(
                    t.x, t.y,
                    vx, vy,
                    t.sx, t.sy,
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
        e.changedTouches
        forEach(e.changedTouches, o =>
        {
            let ind = getTouchesInd(o.identifier);
            if (ind > -1)
            {
                let t = ogTouches[ind];
                ogTouches.splice(ind, 1);
                let vx = o.clientX - t.x;
                let vy = o.clientY - t.y;
                t.x = o.clientX;
                t.y = o.clientY;
                callBack(new PointerData(
                    t.x, t.y,
                    vx, vy,
                    t.sx, t.sy,
                    false, false
                ));
            }
        });
    }
}