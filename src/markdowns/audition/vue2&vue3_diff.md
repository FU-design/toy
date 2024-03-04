### 写法：

- create App 语法
- watch
- computed
- 组合式 api 的写法

### 生命周期：

vue2 => vue3:

- `beforeCreate()`、`created()` ==> `setupt()`
- `beforeMount()` => `onBeforeMount()`
- `mounted()` => `onMounted()`
- `beforeUpdate()`
- `updated()`
- `beforeDestroy()` => `beforeUnmount()`
- `destroyed()` => `unmounted()`

  应用程序将在 `setup()` 钩子函数之前调用 `beforeCreate()` 钩子函数，并在 `setup()` 之后立即调用 `created()` 钩子函数。因此我们可以使用 `setup()` 来处理 `beforeCreate()` 和 `create()` 中需要的内容。

### 组件根节点：

- v3 支持多个根节点

### 组件通信：

- v3 在 setup(props,ctx) ,

  - `props`：对组件的 `props` 的不可变访问
  - `context`：公开的属性（`{ emit,slots,attrs}`）；

- 父组件获取子组件时，子组件需要通过 `defineExpose` 暴露自身方法，否则使用子组件的实例获取时，是获取不到的；而 v2 可以直接获取；

### 响应式原理的实现：

- v3 使用的是 `Proxy`，v2 使用的是 `Object.defineProperty()`
- 缓存实例化结果
- 优化依赖追踪
- Setup 函数

### v-model：

- v3 中组件支持多个 v-model；

### 性能优化上

- 虚拟 dom 优化
- 零碎更新策略
- Tree Shaking
- 编译器的优化：优化包括`静态节点提升`、`slot` 的优化、`事件侦听器缓存`等，以及` CPS`、`Treesharking` 等技术的应用，**有效地减小了编译大小和编译时间**

### 宏定义

### 指令

### 内置组件

- `teleport`
- `Suspense`

> The Vue 3.0 focus on performance improvements:
>
> - a smaller size of the core
> - tree-shaking
> - optimized slots generation
> - hoisting and inlining
