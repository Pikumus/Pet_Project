// store/modules/basket.js
export default {
  state: {
    selectedProduct: null,
  },
  getters: {
    getSelectedProduct: (state) => state.selectedProduct,
  },
  mutations: {
    setSelectedProduct(state, product) {
      state.selectedProduct = product;
    },
  },
  actions: {
    setSelectedProduct({ commit }, product) {
      commit("setSelectedProduct", product);
    },
  },
};
