import type { App } from 'vue';

const install = (app: App) => {
  app.config.globalProperties.$copyText = copyText;
};

export default install;
