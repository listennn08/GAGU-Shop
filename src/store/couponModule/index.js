import Vue from 'vue';

const couponModule = {
  namespaced: true,
  state: () => ({
    coupons: [],
    coupon: {
      id: null,
      title: null,
      percent: null,
      enabled: false,
      deadline: {
        datetime: null,
        diff: null,
      },
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
  },
  mutations: {
    SET_ORDERS(state, data) {
      Vue.set(state, 'orders', data);
    },
    SET_ORDER(state, data) {
      Vue.set(state, 'order', { ...data });
    },
    SET_COUPONS(state, data) {
      Vue.set(state, 'coupons', data);
    },
    SET_COUPON(state, data) {
      Vue.set(state, 'coupon', { ...data });
    },
    CLEAR_TEMP_COUPON(state) {
      Vue.set(state, 'coupon', {
        id: null,
        title: null,
        percent: null,
        enabled: null,
        deadline: {
          datetime: null,
          diff: null,
        },
      });
    },
  },
};

export default couponModule;
