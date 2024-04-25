import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./theme/index.css";
import globalPlugin from "./plugins/global";

const app = createApp(App);
app.use(globalPlugin);
app.use(router);
app.mount("#app");
