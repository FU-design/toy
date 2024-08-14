## vitest 的使用

### 一. 安装 vitest 和 一些需要用到的依赖

```
pnpm add vitest @vue/test-utils happy-dom -D
```

### 二. 配置 vitest ,可在 vite.config.ts 中配置,也可单独在 vitest.config.ts 同级目录下创建 vitest.config.ts 文件。**（vitest.config.ts 文件中配置的优先级高于 vite.config.ts 文件）**

```ts
// vitest.config.ts

// 添加这一行适配ts
/// <reference types="vitest/config" />

// Configure Vitest (https://vitest.dev/config/)
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  plugins: [vue()],
  test: {
    // 启用类似 jest 的全局测试 API
    globals: true,
    include: ["**/tests/**/*.spec.ts"], // Adjust this pattern to match your directory structure
    // 使用 happy-dom 模拟 DOM
    // 这需要你安装 happy-dom 作为对等依赖（peer dependency）
    environment: "happy-dom",
  },
});
```

### 三. 在 package.json 中添加 scripts

```json
"scripts": {
  // ....
    "test:unit": "vitest",
    "test": "vitest"
  },
```

### 四. 编写测试代码（单元测试）在 src 目录下创建 `tests` 目录，并在 tests 目录下创建一个 `xxx.test.ts` 文件。

1. 对工具函数 "`mockData, getImgs`" 的单元测试，创建文件 `mock.test.ts`

   ```ts
   import { mockData, getImgs } from "../../../src/utils/mock.ts";
   import { describe, expect, it } from "vitest";

   describe("mockData", () => {
     it("should return data contain code, data, msg property", async () => {
       const defaultSize = 1000;
       const respones = await mockData();
       expect(respones).toHaveProperty("code", 200);
       expect(respones).toHaveProperty("data");
       expect(respones).toHaveProperty("msg");
       expect(respones.data).toHaveLength(defaultSize);
     });

     it("should return 50 pieces of data after some time", async () => {
       const size = 50;
       const respones = await mockData(50);
       expect(respones.data).toHaveLength(size);
     });

     it("should reject with error if the request fails", async () => {
       const size = -1;
       const promise = mockData(size);
       await expect(promise).rejects.toThrow("size must be greater than 0");
     });
   });

   describe("getImgs", async () => {
     it("should handle default parameters correctly", async () => {
       const defaultSize = 30;
       const imgList = await getImgs();
       expect(imgList).toHaveLength(defaultSize);
       expect(
         imgList.every((url) => url.startsWith("https://picsum.photos/id/"))
       ).toBe(true);
     });

     it("should return return 100 pictures of 500*500", async () => {
       const size = 100;
       const imgList = await getImgs(size, 500, 500);
       expect(imgList).toHaveLength(size);
       expect(
         imgList.every((url) => url.startsWith("https://picsum.photos/id/"))
       ).toBe(true);
     });

     it("should reject with error if the request fails", async () => {
       const size = -1;
       const promise = getImgs(size);
       await expect(promise).rejects.toThrow("size must be greater than 0");
     });
   });
   ```

2. 对 vue 组件 "`CardBox.vue`" 的测试，创建测试文件 `card-box.spec.ts`

   ```ts
   import { mount } from "@vue/test-utils";
   import CardBox from "../../../src/components/cardBox/CardBox.vue";
   import { expect, it, describe } from "vitest";

   describe("CardBox", () => {
     it("does not render a header element when showHeader is false", () => {
       const showHeader = false;
       const wrapper = mount(CardBox, {
         props: {
           showHeader,
         },
       });
       const header = wrapper.find("header");
       expect(header.exists()).toBe(showHeader);
     });

     it("renders default slot content when no content is provided", () => {
       const wrapper = mount(CardBox);

       expect(wrapper.find("p").exists()).toBe(true);
       expect(wrapper.find("p").text()).toContain("我是卡片");
     });

     it("renders custom header, body, and footer content via slots", () => {
       const wrapper = mount(CardBox, {
         slots: {
           header: "<h1>自定义头部</h1>",
           default: '<div class="content">自定义内容</div>',
           footer: "<button>确认</button>",
         },
       });
       expect(wrapper.find("p").exists()).toBe(false);
       expect(wrapper.find("h1").text()).toContain("自定义头部");
       expect(wrapper.find(".content").text()).toContain("自定义内容");
       expect(wrapper.find("button").text()).toContain("确认");
     });
   });
   ```
