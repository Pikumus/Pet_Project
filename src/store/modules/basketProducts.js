// store/modules/basket.js
export default {
  state: {
    basketProducts: [],
  },
  getters: {
    getBasketProducts: (state) => state.basketProducts,
  },
  mutations: {
    addBasketProduct(state, product) {
      const exists = state.basketProducts.some(
        (item) => item.id === product.id
      );
      if (!exists) {
        state.basketProducts = [...state.basketProducts, product];
      }
    },
    removeBasketProduct(state, productId) {
      state.basketProducts = state.basketProducts.filter(
        (product) => product.id !== productId
      );
    },
  },
  actions: {
    addProduct({ commit }, product) {
      commit("addBasketProduct", product);
    },
    removeProduct({ commit }, productId) {
      commit("removeBasketProduct", productId);
    },
  },
};
