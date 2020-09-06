import Vue from 'vue';
import Vuex from 'vuex';
import loginModule from './loginModule';
import productModule from './productModule';
import orderModule from './orderModule';
import shopcartModule from './shopcartModule';
import couponModule from './couponModule';
import fileModule from './fileModule';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: () => ({
    msg: {
      text: '',
      type: false,
    },
    page: {
      open: false,
    },
    loading: false,
    pagination: {
      current_page: 1,
    },
    sticky: false,
    currentStep: 1,
  }),
  getters: {
    msg: (state) => state.msg,
    page: (state) => state.page,
    loading: (state) => state.loading,
    pagination: (state) => state.pagination,
    sticky: (state) => state.sticky,
    currentStep: (state) => state.currentStep,
  },
  actions: {
    setMsg({ commit }, { msg, type }) {
      commit('SET_MSG', {
        msg,
        type,
      });
      setTimeout(() => commit('CLEAR_MSG'), 2000);
    },
    setPagination({ commit }, data) {
      commit('SET_PAGINATION', data);
    },
    togglePage({ commit }) {
      commit('TOGGLE_PAGE');
    },
    toggleLoading({ commit }) {
      commit('TOGGLE_LOADING');
    },
    toggleSticky({ commit }, data) {
      commit('TOGGLE_STICKY', data);
    },
    setCurrentStep({ commit }, step) {
      commit('SET_CURRENTSTEP', step);
    },
  },
  mutations: {
    SET_MSG(state, { msg, type }) {
      Vue.set(state, 'msg', {
        text: msg,
        type,
      });
    },
    CLEAR_MSG(state) {
      Vue.set(state, 'msg', { text: '' });
    },
    SET_PAGINATION(state, data) {
      Vue.set(state, 'pagination', { ...data });
    },
    TOGGLE_STICKY(state, data) {
      Vue.set(state, 'sticky', data);
    },
    TOGGLE_LOADING(state) {
      Vue.set(state, 'loading', !state.loading);
    },
    TOGGLE_PAGE(state) {
      Vue.set(state.page, 'open', !state.page.open);
    },
    SET_CURRENTSTEP(state, step) {
      Vue.set(state, 'currentStep', step);
    },
  },
  modules: {
    login: loginModule,
    product: productModule,
    order: orderModule,
    shopcart: shopcartModule,
    coupon: couponModule,
    file: fileModule,
  },
});

export default store;
