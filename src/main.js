import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './assets/fonts.css';

import { GlobeAltIcon, PhoneIcon, UserCircleIcon } from '@heroicons/vue/24/outline';

createApp(App)
  .use(router)
  .mount('#app');
