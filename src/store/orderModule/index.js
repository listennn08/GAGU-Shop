import Vue from 'vue';

const orderModule = {
  namespaced: true,
  state: () => ({
    orders: [],
    order: {},
  }),
  getters: {
    orders: (state) => state.orders,
    order: (state) => state.order,
  },
  actions: {
    setOrders({ commit }, data) {
      commit('SET_ORDERS', data);
    },
    setOrder({ commit }, data) {
      commit('SET_ORDER', data);
    },
  },
  mutations: {
    SET_ORDERS(state, data) {
      Vue.set(state, 'orders', data);
    },
    SET_ORDER(state, data) {
      Vue.set(state, 'order', { ...data });
    },
  },
};

export default orderModule;
