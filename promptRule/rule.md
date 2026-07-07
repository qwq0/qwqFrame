请帮我使用qframe框架生成页面，可以直接通过es模块"qwq-frame"引用此框架中的所有类和函数，此框架的规则如下:

-- 规则开始 --

规则中给出类名都是以大写开头的，小写开头的同名表示其实例，下面给出部分"qwq-frame"导出的标识符:  
- 类 NElement, NAttr, NEvent, NStyle, NTagName, NList
- 函数 getNElement, styles, bindAttribute, createHookObj, bindValue
- 实例或特殊对象 eventName, nTagName

# 元素实例
- NElement 是dom中Element在框架中的封装类，每个Element对应的NElement都是确定且唯一的，可以等效于Element，也可以通过此类的成员 nElement.node 访问到原生dom中的实例
- getNElement 函数是获取原生dom的Element对应的NElement的函数，可用于无法绕开原生api调用的场景，例如 getNElement(document.body)
- NElement上提供了一些方法可以快速的进行一些操作，部分方法会在下方规则给出

# 元素描述
- 所有的元素都写作js中的数组
- 数组中所有的成员可以有不同的类型
- 若数组中的成员是一个数组 则代表此成员只带此元素的子元素
- 若数组中的成员是一个字符串 表示在此位置插入一个文本节点
- 若数组中存在NTagName类实例 表示此元素是div以外的元素，若是div则可缺省此成员，使用 nTagName.标签名 可以快速获取此类实例 例如 nTagName.img
- 若数组中的成员是一个NAttr类实例 表示为此元素增加一个html标签属性，使用 new NAttr("name", "value") 来创建一个NAttr实例
- 若数组中的成员是一个style列表 表示为此元素添加样式，使用styles函数创建一个style列表，接受一个参数 类型为一个对象，其中键为驼峰格式的css样式名 值为字符串格式的css样式值
- 同一个元素的描述中有多个style的情况 数组中更靠后的样式有更高的优先级
- 若数组中的成员是一个NEvent类实例 表示为此元素增加一个事件监听器，使用 eventName.事件名(回调) 调用此类 例如 eventName.click(e=>console.log("clicked"))
- 若数组中的成员是一个函数 表示此元素创建时hook，框架渲染到此函数时(创建元素树时)自动执行此函数 并传入当前所在的元素对应的NElement实例，如果需要获取特定元素以供其他部分操作 应当创建一个匿名函数并将此元素的NElement储存到某个变量中备用 以避免再从dom树中获取对象

# 将元素显示或移除
- NList.getElement(data) 实例化以上的元素描述到NElement元素
- body.addChild(nElement) 将元素描述解析为元素实例并添加到dom中 此处的body本身也是一个NElement实例
- element.remove() 移除实例化的元素

# 样式复用与元素操作
- 将 styles 函数得到的返回值保存到变量可以复用给多个元素 若不必复用的 styles 也可以在元素描述中就地创建
- 将元素实例化后保存到变量以便添加到页面 移除等操作
- 对于已经创建完成的元素 可以使用 nElement.applyNList(styles实例) 或 nElement.setStyles(参数同styles函数的参数)

# 动画效果
- nElement.animate(keyframes, options):Animation  使用此方法可以执行dom动画，其中keyframes可以是Array<Keyframe> | PropertyIndexedKeyframes，options可以是毫秒单位的时间或KeyframeAnimationOptions
- nElement.animateCommit(keyframes, options):Promise<void>  此方法类似上一种方法，但会在动画执行结束后将最终样式直接覆盖到元素中，且会在动画结束同时完成Promise

# 显示与数据联动
qframe中存在两种数据联动方式 使用不同的方式实现 需要根据需要按需使用
### 使用Proxy对象
- proxyedObject = createHookObj(srcObject) 使用此方法将对象封装为一个Proxy对象 可以将此对象作为数据对象
- bindValue(proxyedObject, key) 可以获取一个Proxy对象中的某个键的绑定实例，可以将此实例传递给 元素描述 中以进行联动，例如若某个值是string则可以取代 显示的文本 或 styles中的值
- bindValue(proxyedObject, key, func) 类似上述绑定 但使用func提供的函数处理变化后的值，可用于原始数据不是期望的值的情况 例如原始数据不是字符串类型 或是需要添加前缀后缀 或是转成可读格式的场景
### 在已经存在的对象中打入getter/setter
- bindAttribute(attrName, obj, key, noInitialize = false) 创建一个对象中的键与元素属性的绑定，使用此方法创建一个 getter/setter 对到 obj 对象的 key 上，对obj的写入和读取都被重定向到当前元素的 attrName 属性，特别的对于noInitialize=true时，不将obj.key的原始值初始化给nElement.attrName而是完全丢弃原始值

-- 规则结束 --