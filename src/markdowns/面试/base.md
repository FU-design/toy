以下是文章中的所有题目名：

# Html5 和 CSS3

- 常见的水平垂直居中实现方案
  1. display: `flex/grid`
     ```css
     .father {
       display: flex/grid;
       justify-content: center;
       align-items: center;
     }
     ```
  2. 绝对定位 + `transform:translate(-50%,-50%)`;
     ```css
     .father {
       position: relative;
     }
     .child {
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%, -50%);
     }
     ```
  3. 绝对定位 + `margin:auto`;
     ```css
     .father {
       position: relative;
     }
     .child {
       position: absolute;
       margin: auto;
       top: 0;
       right: 0;
       bottom: 0;
       left: 0;
     }
     ```
- BFC 问题

  1. Block Formmatting Context (BFC) 格式化上下文，css 布局中的一种概念，它影响元素如何定位以及与其他元素的交互。
  2. BFC 的作用：
     - 清除浮动： BFC 中的元素会避免与浮动元素重叠，让其包含浮动元素，自身自适应高度。
     - 避免元素的重叠：在 BFC 中的元素会避免与浮动元素重叠，确保布局不被破坏
     - 独立的布局环境：BFC 内的元素与外部元素的布局不会互相影响，它有自己独立的布局规则。
  3. 触发条件
     - `float` 属性为非 `none`
     - `position` 为 `absolute/fixed`
     - `display` 为 `inline-block/table-cell/table-caption`
     - `overflow` 值不为 `visible` (`hidden/auto/scroll` 即可)
     - `display: table-\*`
     - `display: flex/grid`
     - 根元素

- flex:1; 是哪些属性的缩写，对应的属性代表什么含义
  - `flex:1` <==> `flex:1 1 0%`
    - `1` 代表 `flex-grow`;
    - `1` 代表 `flex-shrink`;
    - `0%` 代表 `flex-basis`;
- 隐藏元素的属性有哪些
  - `opacity:0`: 元素的透明度，元素大小不变，**不影响布局和元素交互**。
  - `visibility:hidden`: 元素不可见，元素本身大小不变，**不影响布局**，但元素**无法交互**
  - `display:none`: 隐藏元素，元素本身会消失，**会影响布局**。

# Js 相关

- 为什么 let a = '123' 之后可以 a 可以直接使用 String 的方法？
- Js 的基础类型，typeof 和 instanceof 的区别
  - typeof: typeof 可以用来判断基本类型，返回值为 string。
  - instanceof: instanceof 可以用来判断对象是否属于某个类，返回值为 boolean。
- 数组的 forEach 和 map 方法有哪些区别？常用哪些方法去对数组进行增、删、改
- 闭包和作用域
- 实现一个类似关键字 new 功能的函数
- 如何实现继承（原型和原型链）
- 箭头函数和普通函数有什么区别
- 迭代器(iterator)接口和生成器(generator)函数的关系
- 浏览器的事件循环机制

# TypeScript

- type 和 interface 的区别
- any、unkonwn、never
- 常见的工具类型

# 关于 Vue

- 虚拟 DOM
- vue3 的变化（改进）
- 关于 vue3 双向绑定的实现
- vue3 中的 ref、toRef、toRefs
- computed 和 watch 的区别
- vue-router 的路由守卫
- composition Api 对比 option Api 的优势

# 浏览器相关

- DOCTYPE 的作用
- 跨域问题
- 浏览器的存储有哪些及它们间的区别
- 说说浏览器渲染页面的过程

# 工具链相关题目

- 对 webpack 的理解
- webpack 中 plugin 和 loader 分别做什么？它们之间的执行顺序？
- webpack 常见的优化方案
- 关于 babel 的理解
- vite 和 webpak 的区别

# 关于 React

- 说说看类组件的生命周期，函数组件使用哪些 hook 来代替的哪些生命周期
- 对于 Fiber 架构理解
- 使用 Hooks 开发常见的优化措施

# 项目相关题

- 关于模块化
- 微前端
- 前端低代码的认识
- 前端权限设计思路
- taro 是如何将 react 代码转换成对应的小程序代码或其他平台代码
- token 可以放在 cookie 里吗？
- 前端埋点的实现，说说看思路
- 说说封装组件的思路

# 性能优化题

- 什么情况下会重绘和回流，常见的改善方案
- 一次请求大量数据怎么优化，数据多导致渲染慢怎么优化

# 手写题

- 模拟链表结构
- 手写一个深拷贝
- 手写 Promise
- 手写防抖和节流函数
- 手写快速排序
- 输入为两个一维数组，将这两个数组合并，去重，不要求排序，返回一维数组
- 编写函数 convert(money) ，传入金额，将金额转换为千分位表示法。
