import Vue from 'vue';

Vue.filter('cash', (val) => (val ? `$${val.toString().replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')}` : ''));
Vue.filter('hideContent', (text) => ((text.length > 40) ? `${text.substring(0, 39)}...` : text));
Vue.filter('hideTitle', (text) => ((text.length > 10) ? `${text.substring(0, 9)}...` : text));
