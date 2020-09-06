import Vue from 'vue';
import moment from 'moment';

const couponModule = {
  namespaced: true,
  state: () => ({
    coupons: [],
    coupon: {
      id: null,
      title: null,
      percent: null,
      enabled: false,
      deadline_at: null,
    },
  }),
  getters: {
    coupons: (state) => state.coupons,
    coupon: (state) => state.coupon,
  },
  actions: {
    setCoupons({ commit }, data) {
      commit('SET_COUPONS', data);
    },
    setCoupon({ commit }, data) {
      commit('SET_COUPON', data);
    },
    addCoupon({ commit }, data) {
      commit('ADD_COUPON', data);
    },
    updateCoupon({ commit }, data) {
      commit('UPDATE_COUPON', data);
    },
    deleteCoupon({ commit }, id) {
      commit('DELETE_COUPON', id);
    },
    clearTempCoupon({ commit }) {
      commit('CLEAR_TEMP_COUPON');
    },
    setEnabled({ commit }) {
      commit('SET_ENABLED');
    },
  },
  mutations: {
    SET_COUPONS(state, data) {
      Vue.set(state, 'coupons', data);
    },
    SET_COUPON(state, {
      code, title, percent, enabled, deadline,
    }) {
      Vue.set(state, 'coupon', {
        code,
        title,
        percent,
        enabled,
        deadline_at: moment(deadline.datetime).format('yyyy-MM-DDThh:mm:ss'),
      });
    },
    CLEAR_TEMP_COUPON(state) {
      Vue.set(state, 'coupon', {
        id: null,
        title: null,
        percent: null,
        enabled: false,
        deadline_at: null,
      });
    },
    SET_ENABLED(state) {
      Vue.set(state.coupon, 'enabled', !state.coupon.enabled);
    },
  },
};

export default couponModule;
