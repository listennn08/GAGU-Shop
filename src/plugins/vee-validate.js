import Vue from 'vue';
import {
  ValidationObserver, ValidationProvider, extend, configure, localize,
} from 'vee-validate';
import tw from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';

/** 表單驗證 */
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
configure({
  classes: {
    valid: 'is-success',
    invalid: 'is-danger',
    dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
  },
});
localize('tw', tw);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
