import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "@/stores/index";
import plugin from "./plugins";
import "./theme/index.css";
const app = createApp(App);

app.use(plugin);
app.use(router);
app.use(pinia);

app.mount("#app");

/**
 * 该监听事件，是对窗口关闭前的二次确认的操作
 */
window.addEventListener("beforeunload", function (e) {
  // 自定义提示信息（某些浏览器可能不显示这个信息）
  const confirmationMessage = "你确定要离开此页面吗？未保存的数据将会丢失。";

  // 现代浏览器设置提示信息
  (e || window.event).returnValue = confirmationMessage;

  // 对旧版浏览器设置返回值
  return confirmationMessage;
});
