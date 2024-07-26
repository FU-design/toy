## 关于监听器（watch）的一些 tips

> 在 Vue.js 中，通过 `watch 选项`（在 Vue 2）或 `watch API & watchEffect API`（在 Vue 3）在组件外或通过异步在组件内创建的数据侦听器<font color=yellow>不会</font>自动清除。**如果组件在卸载前不显式地移除这些侦听器，它们将继续存在。**

> 通常，这种情况不会导致明显的问题，因为在组件卸载后，数据侦听器的目标数据已经不再存在。但如果侦听器是侦听外部对象或服务，则可能会出现问题，因为它们可能会在组件卸载后继续运行。

### 显示的清理

```js
import { ref, watch, onBeforeUnmount } from "vue";

export default {
  setup() {
    const data = ref(0);
    let unwatch;

    // 创建一个侦听器
    unwatch = watch(data, (newValue, oldValue) => {
      console.log(`数据从 ${oldValue} 变为 ${newValue}`);
    });

    // 在组件卸载前清理侦听器
    onBeforeUnmount(() => {
      if (unwatch) {
        unwatch(); // 清理侦听器
        console.log("组件即将卸载，侦听器已清理");
      }
    });

    return {
      data,
    };
  },
};
```

### 使用 effectScope 进行包装,实现一次性清理（vue3）

```js
import { ref, watch, effectScope, onBeforeUnmount } from "vue";

export default {
  setup() {
    const data = ref(0);
    const scope = effectScope();

    // 在 effectScope 中注册 watch 侦听器
    scope.run(() => {
      watch(data, (newValue, oldValue) => {
        console.log(`数据从 ${oldValue} 变为 ${newValue}`);
      });
    });

    // 使用 onBeforeUnmount 钩子在组件卸载前清理 effectScope
    onBeforeUnmount(() => {
      scope.stop(); // 清理 effectScope 内的所有副作用
      console.log("组件即将卸载，effectScope 已清理");
    });

    return {
      data,
    };
  },
};
```
