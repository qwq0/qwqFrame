# qwqFrame 项目结构说明

构建项目使用的工具
- npm包
    - rollup

# 此项目的当前状态

- TODO
    - 紧急的

    - 活动的(当前)

    - 重要的

    - 循环(定期)
        - 检查并优化项目结构
        - 更新项目结构描述

    - 未来


# 此项目的结构
项目结构最后更新的时间: 2023/1/6
- src/ - 源码
    - data/ - 数据处理
        - traverseTree.js - 遍历树
    - debug/ - 调试
    - dom/ - 文档操作
        - element/ - 元素封装
        - event/ - 事件封装
        - feature/ - 功能
        - style/ - 样式
        - tool/ - 工具
    - flow/ - 执行流
        - runOnce.js - 单次执行封装
    - net/ - 网络操作
    - state/ - 状态机
    - util/ - 工具
        - forEach.js - 遍历器
    - index.js - 索引文件


# 渲染流程

## 图像的原始渲染
(此部分与项目不同步 需要更新)
由相机类完成
- 相机 - src/gl/Camera.js
    - 调用 draw 方法 (绘制图像)
        - 更新矩阵
        - 清除画布
        - 计算相机矩阵
        - 设置着色器
        - 调用 render 方法 (执行递归渲染)
            - 检测 视锥剔除 和 遮挡剔除 如果通过
                - 绘制面
                    - 设置物体的世界矩阵
                    - 绑定纹理
                    - 绑定顶点数组
                    - 绘制数据
            - 遍历 子节点 递归调用 render 方法

## 灯光阴影贴图渲染
由灯光类完成
- 灯光 - src/gl/Light.js
    - 调用 renderShadow 方法 (绘制阴影贴图)
        - 更新矩阵
        - 切换帧缓冲区以渲染到纹理
        - 清除画布
        - 设置着色器
        - 调用 render 方法 (执行递归渲染)
            - 绘制面
                - 设置物体的世界矩阵
                - 绑定顶点数组
                - 绘制数据
            - 遍历 子节点 递归调用 render 方法

## 渲染流程(渲染与后期)
由渲染流程封装类完成
- 渲染流程 - 还没写


# 渲染线程与worker线程通信协议
- 渲染线程 -> worker
    - isReady
        - 作为worker发送的isReady的回应
    - objects 一个数组
        - 一个对象
            - 添加物体到worker中
        - 一个数组 长度为8
            - 修改物体的位置角度
        - 一个数组 长度为4
            - 设置物体的力
- worker -> 渲染进程
    - isReady
        - 当worker初始化完成后发送
    - objects 一个数组
        - 一个数组 长度为8
            - 传递物体的位置角度数据

# 坐标规范
x z 水平坐标轴   
y 垂直坐标轴   
下图中的方向为角度为0时的坐标轴方向
```
    | y
    |
    |
    |
    .-------- x
   /
  /
 / z
```
默认情况下   
所有 相机 物体 灯光 的朝向为z轴负方向   

# glsl着色器规范
- 相机着色器
    - 顶点着色器
        - in变量
            - vec4 a_position
                - 原始坐标 (必须) Location=0
            - vec2 a_texcoord
                - 纹理坐标 Location=1
            - vec3 a_normal
                - 原始法线 Location=2
        - uniform变量
            - mat4 u_cameraMatrix
                - 相机(包括投影投影)矩阵 (必须)
            - mat4 u_worldMatrix
                - 世界矩阵 (必须)
        - out变量
            - 同片段着色器的in变量
    - 片段着色器
        - in变量
            - vec3 v_normal
                - 法线
            - vec3 v_thisPos
                - 顶点的世界坐标
            - vec2 v_texcoord
                - 纹理坐标
        - uniform变量
            - sampler2D u_texture
                - 颜色纹理
            - vec3 u_viewPos
                - 视点(相机)的世界坐标
            - vec3 u_markColor
                - (默认未启用)标记颜色(调试)

# glsl着色器生成器规范
- 着色器生成器 - src/gl/shader/builder/ShaderBuilder.js
- glsl着色器生成
    - 顶点着色器
        - 计算 屏幕空间顶点坐标
        - 计算 纹理坐标
        - 计算 世界空间顶点坐标
        - 计算 不包含位移的世界矩阵
        - 计算 法线向量(世界空间)
    - 片段着色器
        - 计算 归一化的法线向量(世界空间)
        - 定义 光的总影响(float)
        - 循环遍历 每个灯光
            - 计算 光照与阴影 得到 当前灯光的贡献
            - 将 当前灯光的贡献 加到 光的总影响
        - 设置 输出颜色不透明通道为1.0
        - 计算 纹理颜色 乘以 光的总影响 得到 输出颜色


# 此项目的使用
    处理游戏逻辑 - 用户实现(在渲染线程中)


# 此项目使用的库
- 库 - lib/
    - 使用了ammo.js库以使用bullet作为物理库 - ammojs/
        - https://github.com/kripken/ammo.js