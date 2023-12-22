import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./router";
import "./theme/index.css";

import hljs from "highlight.js/lib/core";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import css from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml";
import sql from "highlight.js/lib/languages/sql";
import markdown from "highlight.js/lib/languages/markdown";

// 注册语言
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("css", css);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("xml", xml);

const app = createApp(App);

// 全局组件注册
app.component(
  "CardBox",
  defineAsyncComponent(() => import("./components/cardBox/CardBox.vue"))
);

app.component(
  "CodeBlock",
  defineAsyncComponent(() => import("./components/codeBlock/CodeBlock.vue"))
);

app.component(
  "Panel",
  defineAsyncComponent(() => import("./components/panel/Panel.vue"))
);

// 路由装载
app.use(router);
app.use(hljsVuePlugin);
app.mount("#app");
