import pluginApp from './plugin-app'
import pluginComp from './plugin-comp'
import pluginDirective from './plugin-directive'
import vueDOMPurifyHTML from 'vue-dompurify-html'
import type { App } from 'vue'

export default {
  install(app: App) {
    app.use(pluginApp)
    app.use(pluginComp)
    app.use(pluginDirective)
    app.use(vueDOMPurifyHTML)
  }
}
