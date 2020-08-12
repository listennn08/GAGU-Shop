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
    deleteAllItem({ commit }) {
      commit('DELETE_SHOPCART_ITEM');
    },
  },
  mutations: {
    SET_SHOPCART_ITEMS(state, datas) {
      Vue.set(state, 'shopcartItems', [...datas]);
    },
    DELETE_SHOPCART_ITEM(state) {
      Vue.set(state, 'shopcartItems', []);
    },
  },
};

export default shopcartModule;
