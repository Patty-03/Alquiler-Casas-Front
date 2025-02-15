import { createApp } from 'vue';
import './style.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createPinia } from 'pinia';
import '@mdi/font/css/materialdesignicons.css';
import App from './App.vue';
import router from './routes/router';

const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(pinia)
  .use(vuetify)
  .use(router)
  .mount('#app');
