`Vue3.2` 为了 @vue/reactivity 引入一个新的 API `effectScope()`。 EffectScope 实例可以`自动的收集`运行在`同步函数`中的副作用，以便以后一起处理这些副作用。

> 在 Vue 的组件"`setup()`"中，副作用将被收集并绑定到`当前实例`。当实例被卸载时，副作用将被自动释放。但是当我们在`组件之外`或作为一个`独立的包`使用它们时，这并不是那么简单。例如，这可能是我们处理"computed"&"watch"副作用时需要做的事情。

```js
const disposables = [];

const counter = ref(0);
const doubled = computed(() => counter.value * 2);

disposables.push(() => stop(doubled.effect));

const stopWatch1 = watchEffect(() => {
  console.log(`counter: ${counter.value}`);
});

disposables.push(stopWatch1);

const stopWatch2 = watch(doubled, () => {
  console.log(doubled.value);
});

disposables.push(stopWatch2);
```

为了阻止这些影响：

```js
// 循环执行清理副作用函数
disposables.forEach((f) => f());
disposables = [];
```

> 特别是当我们有一些冗长而复杂的组合代码时，手动收集所有副作用是很费力的。也很容易忘记收集它们（或者您无法访问在组合函数中创建的副作用），这可能会导致内存泄漏和意外行为。

> 此 RFC 尝试将组件"setup()"的副作用收集和处置功能抽象为可以在组件模型之外重用的更通用的 API。https://github.com/vuejs/rfcs/pull/212

# 新 api 总览

### effectScope()

- 类型

  ```ts
  function effectScope(detached?: boolean): EffectScope;

  interface EffectScope {
    run<T>(fn: () => T): T | undefined; // undefined if scope is inactive
    stop(): void;
  }
  ```

- 使用方式

  ```js
  // effect, computed, watch, watchEffect created inside the scope will be collected
  import { effectScope } from 'vue';

  const scope = effectScope();

  // 作用域可以运行一个函数，并将捕获函数同步执行期间创建的所有副作用，包括在内部创建副作用的任何API，例如"computed"、"watch"和"watchEffect"：
  scope.run(() => {
    const doubled = computed(() => counter.value * 2);

    watch(doubled, () => console.log(doubled.value));

    watchEffect(() => console.log('Count: ', doubled.value));
  });

  // to dispose all effects in the scope
  scope.stop(); // 他将递归的停止所有收集的副作用和嵌套的作用域
  ```

### getCurrentScope()
