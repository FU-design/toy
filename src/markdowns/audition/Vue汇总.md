### vue3 proxy 解决了哪些问题？

### vue 响应式原理

### 如何理解 Vue 的单向数据流

- **单向数据流**：vue 中所有的 `props` 都遵循**单向绑定**原则,`props` 因父组件的更新而变化，新的状态会传递到子组件。
  <br>
- **原因**：为了组件之间能够更高效的**解耦**。

  > 如一个父组件同时将数据通过 `props` 传递给多个子组件，若其中一个子组件修改了父组件传递来的数据，那么其他子组件中的数据也会被修改，所以不推荐子组件修改 `props`。

- **如何让子组件修改父组件的值（两种常场景）**

  - `prop` 被用于传入初始值；而子组件想在之后将其作为一个局部数据属性。
    处理方式：**重新定义响应式数据接收**
    ```js
    const props = defineProps(["initialCounter"]);
    // 计数器只是将 props.initialCounter 作为初始值
    // 像下面这样做就使 prop 和后续更新无关了
    const counter = ref(props.initialCounter);
    ```
  - 需要对传入的 `prop` 值做进一步的转换。
    处理方式：**计算属性**

    ```js
    const props = defineProps(["size"]);
    // 该 prop 变更时计算属性也会自动更新
    const normalizedSize = computed(() => props.size.trim().toLowerCase());
    ```

  - 通过 **`update:prop`** 实现子组件对 props 的修改，更新父组件

    ```js
    // 子组件
    const props = defineProps({
      visible:{
        type:Boolean, // 原生构造函数、自定义类和构造函数（vue 通过 instanceof 验证类型是否匹配）
        default: false
      },
    })
    const emits = defineEmits(["update:visible"]);

    // 父组件

    <Panel
      :visible="open"
    />
    const open = ref<boolean>(false);
    ```

  <br>

  **`注意`**：<font color=orange>若试图去修改 props，则浏览器会在控制台中抛出警告，"prop 是只读的"</font>; 若是更改的 props 是 **对象/数组**，修改其**对象/数组**的属性，则是**可以生效**的，但是**不推荐**，性能消耗较大。

### vue 中 key 的作用

### vue 和 react 区别，选型考虑

_**相同点：**_

- 单向数据流
- 虚拟 dom
- 支持 SSR
- 组件化开发

_**不同点：**_

- 前者 template,后者 JSX
- 数据改变，前者响应式，后者手动 setState
- React 单向绑定，Vue 双向绑定
- React 状态管理工具 Redux、Mobx; Vue 状态管理工具 Vuex、Pinia

### vue 组件间通信

- 父子通信：

  - `props/$emits`
  - `$ref`
  - `$parent/$children`
  - `provide/inject`
  - `$emit/$on（事件总线）`
  - `$attrs/$listeners`
  - `vuex`
  - `pinia`、

- 兄弟通信：

  - `$emit/$on（事件总线）`
  - `vuex`
  - `pinia`

- 跨组件通信：

  - `provide/inject`
  - `$emit/$on（事件总线）`
  - `$attrs/$listeners`
  - `vuex`
  - `pinia`

### vuex 数据流动过程

### css module 原理

### 说一下虚拟 DOM？为什么要使用虚拟 DOM？

### SPA 单页面应用和多页面应用有什么区别

### computed 和 watch 的区别

### data 为什么是个函数，而不是对象

防止组件被多个页面使用时，造成的变量互相污染

### 使用过哪些 Vue 的修饰符

- .lazy：输入框失焦时才会更新 v-model 的值
- .trim：讲 v-model 绑定的值首位空格给去掉
- .number：将 v-medol 绑定的值转数字
- .stop：阻止事件冒泡
- .capture：事件的捕获
- .self：点击事件绑定本身才触发
- .once：事件只触发一次
- .prevent：阻止默认事件
- .native：绑定事件在自定义组件上时，确保能执行
- .left、.middle、.right：鼠标左中右键的触发
- passive：相当于给移动端滚动事件加一个.lazy
- camel：确保变量名会被识别成驼峰命名
- .sync：简化子修改父值的步骤

### 路由的几种模式？

- **hash**：哈希模式，根据 hash 值更改进行组件切换，而不刷新页面
- **history**：历史模式，依赖于 HTML5 的 `pushState`、`replaceState`
- **abstract**：适用于 Node

### 路由的钩子函数

- _**全局钩子**_
  - **beforeEach**：跳转路由前
    参数：
    - `to`：将要跳转进入的路由对象
    - `from`：将要离开的路由对象
    - `next`：执行跳转的方法
  - **afterEach**：路由跳转后
    参数：
    - `to`：将要跳转进入的路由对象
- _**路由独享钩子**_

  ```js
  routes: [
    {
      path: "/xxx",
      component: xxx,
      beforeEnter: (to, from, next) => {},
    },
  ];
  ```

- _**组件内路由钩子**_
  - **beforeRouteEnter**(`to`, `from`, `next`)：跳转路由渲染组件时触发
  - **beforeRouteUpdate**(`to`, `from`, `next`)：跳转路由且组件被复用时触发
  - **beforeRouteLeave**(`to`, `from`, `next`)：跳转路由且离开组件时触发

### watch 能监听 computed 的属性吗

### vue 的生命周期

### mounted 拿到数据可以后可以直接获取 dom 吗

### nextTick 原理

### vue 模板（template）里为什么不能使用多个头结点？

### vuex 为什么同时设计 mutation 和 action？只设计一个行不行？

### vue2 和 vue3 的区别？

[](https://www.jb51.net/javascript/288328me2.htm)
[](https://developer.aliyun.com/article/1104010)

### vue 挂载和卸载父子组件生命周期钩子执行顺序

### keep-alive 的原理，使用有什么问题？如何解决？

### vue 的优点和缺点

_**优点**_

- 渐进式
- 组件化开发
- 虚拟 dom
- 响应式数据
- 单页面路由
- 数据与视图分离

_**缺点**_

- 单页面应用不利于 seo
- 不兼容 IE
- 首屏加载时间长

### vue3 中的宏

### vue 的优化方案（等同于如何编写可读性高、易维护且高性能的 vue 代码）

[](https://blog.csdn.net/weixin_54542328/article/details/134599250)
