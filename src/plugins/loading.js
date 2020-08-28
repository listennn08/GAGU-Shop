import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(Loading, {
  color: '#D3AC2B',
  loader: 'bars',
  width: 64,
  height: 64,
  backgroundColor: '#fff',
  opacity: 1,
  zIndex: 9999,
});
