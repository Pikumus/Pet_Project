// store/modules/basket.js

export default {
  state: {
    basketProducts: [],
  },
  getters: {
    getAddedProducts: (state) => {
      return state.basketProducts.reduce((acc, product) => {
        acc[product.id] = product.added;
        return acc;
      }, {});
    },

    getBasketProducts: (state) => state.basketProducts,
  },
  mutations: {
    addBasketProduct(state, product) {
      const exists = state.basketProducts.some(
        (item) => item.id === product.id
      );
      if (!exists) {
        state.basketProducts = [
          ...state.basketProducts,
          { ...product, added: true },
        ];
      }
    },
    removeBasketProduct(state, productId) {
      state.basketProducts = state.basketProducts.filter(
        (product) => product.id !== productId
      );
    },
    updateProductAddedState(state, { productId, added }) {
      const product = state.basketProducts.find(
        (product) => product.id === productId
      );
      if (product) {
        product.added = added;
      }
    },
  },
  actions: {
    addProduct({ commit }, product) {
      commit("addBasketProduct", product);
      commit("updateProductAddedState", { productId: product.id, added: true });
    },
    removeProduct({ commit }, productId) {
      commit("removeBasketProduct", productId);
      commit("updateProductAddedState", { productId, added: false });
    },
  },
};
