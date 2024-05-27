// import { defineAsyncComponent as asyncComp } from "vue";

// const compMap = {
//   cardBox: "cardBox/CardBox",
//   panel: "panel/Panel",
// };

// const install = (app: any) => {
//   // 对只有组件名，未提供组件路径或路径错误的抛出和捕获处理
//   for (const [key, path] of Object.entries(compMap)) {
//     if (!path) {
//       throw new Error(`Component ${key} not found.`);
//     }
//     app.component(
//       key,
//       asyncComp(() => import(`@/components/${path}.vue`))
//     );
//   }
// };

// export default {
//   install: install,
// };

import components from "@/components";
import type { App } from "vue";

const install = (app: App) => {
  for (const [key, comp] of Object.entries(components)) {
    app.component(key, comp);
  }
};

export default {
  install,
};
