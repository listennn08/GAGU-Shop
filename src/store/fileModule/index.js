import Vue from 'vue';

const fileModule = {
  namespaced: true,
  state: () => ({
    files: [],
  }),
  getters: {
    files: (state) => state.files,
  },
  actions: {
    setFiles({ commit }, data) {
      commit('SET_FILES', data);
    },
    addFile({ commit }, data) {
      commit('ADD_FILE', data);
    },
    delFile({ commit }, data) {
      commit('DEL_FILE', data);
    },
  },
  mutations: {
    SET_FILES(state, data) {
      Vue.set(state, 'files', data);
    },
    ADD_FILE(state, data) {
      Vue.set(state.files, state.files.length, data);
    },
    DEL_FILE(state, index) {
      state.files.splice(index, 1);
      Vue.set(state, 'files', state.files);
    },
  },
};

export default fileModule;
