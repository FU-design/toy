import directivePlugin from './globalDirective';
import compPlugin from './globalComp';
import varible from './globalVarible';
import vueDOMPurifyHTML from 'vue-dompurify-html';
import type { App } from 'vue';

export default {
  install(app: App, options?: any) {
    app.use(compPlugin);
    app.use(directivePlugin);
    app.use(vueDOMPurifyHTML);
    app.use(varible);
  }
};
