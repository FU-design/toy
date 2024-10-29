import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from '@/stores/index';
import plugin from './plugins';

import './styles/main.css';
import 'virtual:svg-icons-register';

const app = createApp(App);
app.use(plugin);
app.use(router);
app.use(pinia);
app.mount('#app');
