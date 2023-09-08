# qwqFrame 项目结构说明

构建项目使用的工具

-   npm 包
    -   rollup

# 此项目的当前状态

-   TODO

    -   紧急的

    -   活动的(当前)

    -   重要的

    -   循环(定期)

        -   检查并优化项目结构
        -   更新项目结构描述

    -   未来

# 此项目的结构

项目结构最后更新的时间: 2023/9/8

-   src/ - 源码
    -   data/ - 数据处理
        -   hool/ - 数据对象钩子
            -   HookBindCallback.js - 钩子绑定到回调类
            -   HookBindInfo.js - 钩子绑定信息类
            -   HookBindValue.js - 钩子绑定到值类
            -   hookStatus.js - 全局钩子状态
            -   proxyHook.js - 代理钩子
        -   tree/ - 有关树的操作
            -   traverseTree.js - 遍历树
    -   debug/ - 调试
    -   dom/ - 文档操作
        -   element/ - 元素封装
            -   NElement.js - html 元素的封装
        -   feature/ - 功能
            -   NAsse.js - 流水线类
            -   NAttr.js - 属性类
            -   NEvent.js - 事件类
            -   NList.js - 特征列表类
            -   NStyle.js - 样式类
            -   NTagName.js - 标签名类
        -   style/ - 样式
            -   cssGen.js - 常见 css 值生成
        -   tool/ - 工具
            -   event/ - 常用事件处理工具
                -   keyboard.js - 绑定键盘事件
                -   keyboardTable.js - 键盘对应表
                -   keyData.js - 按键数据类
                -   mouse.js - 绑定鼠标事件
                -   pointerData.js - 指针数据类
                -   touch.js - 绑定触摸事件
            -   bindAttribute.js - 绑定 html 元素的属性到对象中
            -   divideLayout.js - (不建议)分割视图创建工具
            -   expandElement.js - (不建议|陈旧)展开数据对象到元素
            -   parsingElement.js - (不建议|实验性)从模板字符串解析元素
    -   flow/ - 执行流
        -   runOnce.js - 单次执行封装
    -   net/ - 网络操作
    -   state/ - 状态机
    -   util/ - 工具
        -   delayPromise.js - 封装计时器到 Promise
        -   EventHandler.js - 事件处理器
        -   forEach.js - 遍历器
    -   index.js - 索引文件
