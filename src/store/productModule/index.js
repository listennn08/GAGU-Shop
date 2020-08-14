import Vue from 'vue';

const productModule = {
  namespaced: true,
  state: () => ({
    category: [''],
    products: [],
    tempProduct: {
      id: null,
      title: null,
      category: null,
      content: null,
      imageUrl: [],
      enabled: null,
      origin_price: null,
      price: null,
      unit: null,
      options: {
        store: null,
      },
    },
  }),
  getters: {
    products: (state) => (
      (state.category.length > 1)
        ? state.products.filter((el) => {
          const cat = el.category.toLowerCase();
          return cat.indexOf(state.category[0]) > -1 || cat.indexOf(state.category[1]) > -1;
        })
        : state.products.filter((el) => el.category
          .toLowerCase()
          .indexOf(state.category[0]) > -1)
    ),
    tempProduct: (state) => state.tempProduct,
    category: (state) => state.category,
  },
  actions: {
    setProducts({ commit }, data) {
      commit('SET_PRODUCTS', data);
    },
    addProducts({ commit }, data) {
      commit('ADD_PRODUCTS', data);
    },
    editProduct({ commit }, { id, data }) {
      commit('EDIT_PRODUCT', {
        id,
        data,
      });
    },
    delProduct({ commit }, index) {
      commit('DEL_PRODUCT', index);
    },
    setTempProduct({ commit }, data) {
      commit('SET_TEMP_PRODUCT', data);
    },
    clearTempProduct({ commit }) {
      commit('CLEAR_TEMP_PRODUCT');
    },
    /** 設定顯示類別 */
    setCategory({ commit }, category) {
      commit('SET_CATEGORY', category);
    },
  },
  mutations: {
    SET_PRODUCTS(state, data) {
      Vue.set(state, 'products', [...data]);
    },
    ADD_PRODUCTS(state, data) {
      state.products.unshift(data);
      Vue.set(state, 'products', state.products);
    },
    EDIT_PRODUCT(state, { id, data }) {
      state.products.forEach((prod, index) => {
        if (prod.id === id) {
          Vue.set(state.products, index, data);
        }
      });
    },
    DEL_PRODUCT(state, index) {
      state.products.splice(index, 1);
      Vue.set(state, 'products', state.products);
    },
    SET_TEMP_PRODUCT(state, data) {
      Vue.set(state, 'tempProduct', { ...data });
    },
    CLEAR_TEMP_PRODUCT(state) {
      Vue.set(state, 'tempProduct', {
        id: null,
        title: null,
        category: null,
        content: null,
        imageUrl: [],
        enabled: null,
        origin_price: null,
        price: null,
        unit: null,
        options: {
          store: null,
        },
      });
    },
    SET_CATEGORY(state, category) {
      switch (category) {
        case 'bed':
        case 'curtain':
          Vue.set(state, 'category', [category]);
          break;
        case 'chair':
          Vue.set(state, 'category', [category, 'sofa']);
          break;
        case 'case':
          Vue.set(state, 'category', [category, 'table']);
          break;
        default:
          Vue.set(state, 'category', [category]);
      }
    },
  },
};

export default productModule;
