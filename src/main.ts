import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./theme/index.css";
import plugin from "./plugins";
// pinia 持久化插件引入
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);
const pinia = createPinia();

app.use(plugin);
app.use(router);
app.use(pinia.use(piniaPluginPersistedstate));
app.mount("#app");
