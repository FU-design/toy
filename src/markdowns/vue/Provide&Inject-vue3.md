#### VUE3 Provide / Inject 的使用（值传递，函数传递）

- 值传递
- 函数传递

#### 父组件

```js
import { ref, readonly, provide } from "vue";

const msg = ref("Hi");
const getInfo = () => {
  return msg;
};

provide("msg", readonly(msg)); // 提供变量（也可为响应式）readonly:不允许子孙组件修改源数据
provide("getInfo", getInfo); // 提供函数
```

#### 子组件

```js
import { inject } from "vue";

const msg = inject("msg");
const getInfo = inject("getInfo", Function, true); // 接收父组件的函数时是另一种写法
```
