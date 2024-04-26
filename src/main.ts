import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./theme/index.css";
import globalPlugin from "./plugins/global";

const app = createApp(App);
const pinia = createPinia();

app.use(globalPlugin);
app.use(router);
app.use(pinia);
app.mount("#app");
