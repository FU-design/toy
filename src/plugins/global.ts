import directivePlugins from "./directive";
import compPlugins from "./comp";
import hljsVuePlugin from "./highlight";
export default {
  install(app: any, _options?: any) {
    app.use(compPlugins);
    app.use(directivePlugins);
    app.use(hljsVuePlugin);
  },
};
