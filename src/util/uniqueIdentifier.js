/**
 * 36的8次方
 */
const num_36_pow_8 = 2821109907456;

/**
 * 生成唯一字符串(qwq-uid)
 * 基于毫秒级时间和随机数
 * 
 * qwq-uid格式
 * 仅由 小写字母 数字 连字符 组成
 * 不以连字符开头或结尾
 * 不存在两个相邻的连字符
 * 即由零或几个连字符分隔的多个字母和数字子串
 * 第一个子串为36进制的毫秒级时间戳
 * 其后的子串为36进制的随机数
 * 
 * 优先安全随机
 * 当安全随机不可用时回退到普通随机(不保证安全性)
 * 
 * @param {number} [randomSection] 随机节数量
 * @returns {string}
 */
export function uniqueIdentifierString(randomSection = 2)
{
    var ret = Math.floor(Date.now()).toString(36);
    if (globalThis?.crypto?.getRandomValues)
    {
        let randomBuffer = crypto.getRandomValues(new Uint8Array(randomSection * 6));
        for (let i = 0; i < randomSection; i++)
        {
            let value = 0;
            for (let j = 0; j < 6; j++)
                value = (value + randomBuffer[(i * 6) + j]) / 256;
            ret += "-" + Math.floor(Math.random() * num_36_pow_8).toString(36);
        }
    }
    else
    {
        for (let i = 0; i < randomSection; i++)
            ret += "-" + Math.floor(Math.random() * num_36_pow_8).toString(36);
    }
    return ret;
}