import { bindArrayHook } from "../../../data/hook/array/proxyArray";
import { NList } from "../../feature/NList";
import { NElement } from "../../node/NElement.js";

/**
 * 创建列表
 * @template {any} T
 * @param {Array<T>} dataArray
 * @param {(data: T) => NElement} builder
 * @param {NList | import("../../feature/NList").NList_list} [listNList]
 * @returns {NElement}
 */
export function buildList(dataArray, builder, listNList)
{
    let list = NList.getElement(listNList ? listNList : []);

    /**
     * @type {Array<NElement>}
     */
    let elementList = [];

    /**
     * 插入列表项的元素
     * @param {number} index
     */
    function insertListItemElement(index)
    {
        if (!elementList[index])
            return;

        if (index == 0)
        {
            list.insChild(elementList[index], 0);
        }
        else if (index == elementList.length - 1)
        {
            list.addChild(elementList[index]);
        }
        else if (index < elementList.length / 2)
        {
            for (let i = index - 1; i >= 0; i--)
            {
                if (elementList[i])
                {
                    elementList[i].insAfter(elementList[index]);
                    return;
                }
            }
            list.insChild(elementList[index], 0);
        }
        else
        {
            for (let i = index + 1, length = elementList.length; i <= length; i++)
            {
                if (elementList[i])
                {
                    elementList[i].insBefore(elementList[index]);
                    return;
                }
            }
            list.addChild(elementList[index]);
        }
    }

    bindArrayHook(dataArray, {
        add: (index, value) =>
        {
            /**
             * @type {NElement}
             */
            let thisElement = null;
            try
            {
                thisElement = builder(value);
            }
            catch (err)
            {
                console.error(err);
            }

            elementList.splice(index, 0, thisElement);

            if (thisElement)
            {
                insertListItemElement(index);
            }
        },
        set: (index, value) =>
        {
            /**
             * @type {NElement}
             */
            let thisElement = null;
            try
            {
                thisElement = builder(value);
            }
            catch (err)
            {
                console.error(err);
            }

            let oldElement = elementList[index];
            elementList[index] = thisElement;

            if (oldElement)
            {
                if (thisElement)
                    oldElement.replaceWith(thisElement);
                else
                    oldElement.remove();
            }
            else if (thisElement)
            {
                insertListItemElement(index);
            }
        },
        del: (index) =>
        {
            if (elementList[index])
            {
                elementList[index].remove();
                elementList[index] = null;
            }
        }
    }, {
        addExisting: true,
        noSet: false
    }).bindDestroy(list);

    return list;
}