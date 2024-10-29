import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();

// pinia 持久化插件引入
pinia.use(piniaPluginPersistedstate);
export default pinia;
