import Vue from 'vue';

const shopcartModule = {
  namespaced: true,
  state: () => ({
    shopcartItems: [],
  }),
  getters: {
    shopcartItems: (state) => state.shopcartItems,
  },
  actions: {
    setShopcartItems({ commit }, datas) {
      commit('SET_SHOPCART_ITEMS', datas);
    },
    deleteItem({ commit }, id) {
      commit('DELETE_SHOPCART_ITEM', id);
    },
    deleteAllItem({ commit }) {
      commit('DELETE_SHOPCART_ITEMS');
    },
  },
  mutations: {
    SET_SHOPCART_ITEMS(state, datas) {
      Vue.set(state, 'shopcartItems', [...datas]);
    },
    DELETE_SHOPCART_ITEM(state, index) {
      state.shopcartItems.splice(index, 1);
      Vue.set(state, 'shopcartItems', state.shopcartItems);
    },
    DELETE_SHOPCART_ITEMS(state) {
      Vue.set(state, 'shopcartItems', []);
    },
  },
};

export default shopcartModule;
