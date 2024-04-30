import directivePlugin from "./globalDirective";
import compPlugin from "./globalComp";
import hljsVuePlugin from "./highlight";
import type { App } from "vue";

export default {
  install(app: App, options?: any) {
    app.use(compPlugin);
    app.use(directivePlugin);
    app.use(hljsVuePlugin);
  },
};
