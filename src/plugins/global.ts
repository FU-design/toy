import globalDirective from "./directive";
import globalComp from "./comp";
import { App } from "vue";

export default {
  install(app: App, _options?: any) {
    // 全局组件注册
    globalComp(app);
    globalDirective(app);
  },
};
