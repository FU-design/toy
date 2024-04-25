import { App, defineAsyncComponent } from "vue";

export default {
  install(app: App, _options?: any) {
    // 全局组件注册
    app.component(
      "CardBox",
      defineAsyncComponent(() => import("@/components/cardBox/CardBox.vue"))
    );

    app.component(
      "CodeBlock",
      defineAsyncComponent(() => import("@/components/codeBlock/CodeBlock.vue"))
    );

    app.component(
      "Panel",
      defineAsyncComponent(() => import("@/components/panel/Panel.vue"))
    );
  },
};
