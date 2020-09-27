import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/loading';
import './plugins/confirm';
import './plugins/fontawesome';
import './plugins/vee-validate';
import './plugins/aos';
import './filters';
import './assets/main.sass';
import './plugins/wow';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
