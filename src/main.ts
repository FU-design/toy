import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "@/stores/index";
import plugin from "./plugins";
// import { windowBeforeCloseConfirm } from "@/utils/tool";
import "./theme/main.css";

// windowBeforeCloseConfirm();
const app = createApp(App);
app.use(plugin);
app.use(router);
app.use(pinia);
app.mount("#app");
