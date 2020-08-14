import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/loading';
import './plugins/confirm';
import './plugins/fontawesome';
import './plugins/vee-validate';
import './filters';
import 'swiper/css/swiper.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
