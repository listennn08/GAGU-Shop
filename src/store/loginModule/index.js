import Vue from 'vue';

const loginModule = {
  namespaced: true,
  state: () => ({
    token: null,
    isLogin: false,
  }),
  getters: {
    token: (state) => state.token,
    isLogin: (state) => state.isLogin,
  },
  actions: {
    setLoginInfo({ commit }, token) {
      commit('SET_LOGIN_INFO', token);
    },
    clearLoginInfo({ commit }) {
      commit('CLEAR_LOGIN_INFO');
    },
  },
  mutations: {
    SET_LOGIN_INFO(state, token) {
      Vue.set(state, 'token', token);
      Vue.set(state, 'isLogin', Boolean(token));
    },
    CLEAR_LOGIN_INFO(state) {
      Vue.set(state, 'token', '');
      Vue.set(state, 'isLogin', false);
    },
  },
};

export default loginModule;
