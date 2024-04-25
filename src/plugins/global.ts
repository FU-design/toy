import directivePlugins from "./directive";
import compPlugins from "./comp";
import { App } from "vue";
import hljsVuePlugin from "./highlight";
export default {
  install(app: App, _options?: any) {
    app.use(compPlugins);
    app.use(directivePlugins);
    app.use(hljsVuePlugin);
  },
};
