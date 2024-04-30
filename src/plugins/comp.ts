import { defineAsyncComponent as asyncComp } from "vue";

const baseCompMap = {
  cardBox: "cardBox/CardBox",
  panel: "panel/Panel",
};

const install = (app: any) => {
  // 对只有组件名，未提供组件路径或路径错误的抛出和捕获处理
  for (const [key, path] of Object.entries(baseCompMap)) {
    if (!path) {
      throw new Error(`Component ${key} not found.`);
    }
    app.component(
      key,
      asyncComp(() => import(`@/components/${path}.vue`))
    );
  }
};

const baseComp = {
  install: install,
};
export default baseComp;
