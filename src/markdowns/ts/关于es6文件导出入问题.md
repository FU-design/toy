## 使用 `import` 和 `import type` 的区别

> 在使用 typescript 开发项目时，往往会在不同页面导入各种变量定义需要的类型，这时需要注意对于类型导入的书写方式；以下列文件为例：

#### 区别：

**1. 用途**：

- **import**：用于导入模块中的值（如函数、对象、类等）和类型。

- **import type**：是 `typescript` 的一种导入语法，用于仅导入类型声明。

**2. 编译后的结果**:

- **import**：会在编译后的 JavaScript 代码中生成相应的导入语句。

- **import type**：`不会`在`编译后`的 JavaScript 代码中`生成`任何`导入语句`，因为它们只在`编译时`用于类型检查，而不会在运行时使用。

`useChat.ts`

```ts
import { ref, Ref } from 'vue';

// 命名带出
export interface ChatInfo {
  chatCode: string;
  chatName: string;
}

interface Chat {
  chatInfo: Ref<ChatInfo | null>;
  setChatInfo: (info: ChatInfo) => void;
}

export default function useChat(): Chat {
  const chatInfo = ref<ChatInfo | null>(null);
  function setChatInfo(info: ChatInfo | null) {}
  // ...

  return {
    chatInfo,
    setChatInfo
  };
}
```

`component.vue`

```ts
<script setup lang="ts">
// 联合写法
import useChat, { type ChatInfo } from "@/hooks/useChat";

// 单个类型导入
import type { ChatInfo } from "@/hooks/useChat";

import { ref } from "vue";
const { chatInfo, setChatInfo } = useChat();
const form = ref<ChatInfo | null>();
<script>
```
