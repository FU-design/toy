import { App, defineAsyncComponent as asyncComp } from "vue";

const compMap = {
  CardBox: "cardBox/CardBox",
  CodeBlock: "codeBlock/CodeBlock",
  Panel: "panel/Panel",
  // Test: "",
};

export default {
  install(app: App, _options?: any) {
    // 对只有组件名，未提供组件路径或路径错误的抛出和捕获处理
    try {
      for (const [key, path] of Object.entries(compMap)) {
        if (!path) {
          throw new Error(`Component ${key} not found.`);
        }
        app.component(
          key,
          asyncComp(() => import(`@/components/${path}.vue`))
        );
      }
    } catch (error) {
      console.error("error :>> ", error);
    }
  },
};