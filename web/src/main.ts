import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { startClusterChanges } from './services/clusterChanges';

startClusterChanges();
createApp(App).use(router).mount('#app');
