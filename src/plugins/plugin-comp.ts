import components from '@/components';
import type { App } from 'vue';

const install = (app: App) => {
  for (const [key, comp] of Object.entries(components)) {
    app.component(key, comp);
  }
};

export default {
  install
};
