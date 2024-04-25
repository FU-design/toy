import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./theme/index.css";
import globalPlugin from "./plugins/global";
import hljsVuePlugin from "./plugins/highlight";

const app = createApp(App);

// 路由装载
app.use(globalPlugin);
app.use(hljsVuePlugin);
app.use(router);
app.mount("#app");
