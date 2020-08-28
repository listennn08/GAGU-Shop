import Vue from 'vue';

Vue.filter('cash', (val) => (val ? `$${val.toString().replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')}` : ''));
Vue.filter('hideContent', (text) => {
  const t = text.replace(/ /g, '').replace(/\n/g, '');
  return ((t.length > 40) ? `${t.substring(0, 37)}...` : t);
});
Vue.filter('hideTitle', (text) => ((text.length > 10) ? `${text.substring(0, 9)}...` : text));
