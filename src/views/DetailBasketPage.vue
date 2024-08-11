<template>
  <div class="detail">
    <the-header
      text="товара"
      subtext="на сумму"
      price="3 500 ₽"
      :classNameBasket="header"
    >
      <template v-slot:basket__icon>
        <arrowicon-vue class="arrow-icon"></arrowicon-vue>
      </template>
      <template v-slot:icon>
        <basketicon></basketicon>
      </template>
    </the-header>
    <card-product
      v-if="selectedProduct"
      :key="selectedProduct.id"
      :item="selectedProduct"
      card-class="card-detail"
      titleClass="card-detail__title"
      imageClass="card-detail__image"
      textClass="card-detail__text"
      price-class="card-detail__price"
      wrapperClass="card-detail__wrapper"
      spacerClass="card-detail__spacer"
    >
      <template v-slot:button>
        <common-button
          v-if="!addedProducts[selectedProduct.id]"
          class="card-button"
          @click="() => handleAddProduct(selectedProduct)"
          text="В Корзину"
        />
        <common-button
          v-else
          text="Удалить из корзины"
          @click="() => handleRemoveProduct(selectedProduct.id)"
        />
      </template>
    </card-product>
  </div>
</template>

<script>
import { useStore } from "vuex"; // Импорт из 'vuex'
import { computed } from "vue";
import CardProduct from "@/components/elements/CardProduct.vue";
import TheHeader from "@/components/block/Header.vue";
import basketicon from "@/components/icon/BasketIcon.vue";
import arrowiconVue from "@/components/icon/BackIcon.vue";
import CommonButton from "@/components/ui/CommonButton.vue";

export default {
  name: "detail-basket",
  components: {
    CommonButton,
    arrowiconVue,
    basketicon,
    TheHeader,
    CardProduct,
  },
  setup() {
    const store = useStore();
    const selectedProduct = computed(() => store.getters.getSelectedProduct);
    const addedProducts = computed(() => store.getters.getAddedProducts);

    const handleAddProduct = (selectedProduct) => {
      console.log(selectedProduct);
      console.log("hoooool");
      addedProducts[selectedProduct.id] = true;
      store.dispatch("addProduct", selectedProduct);
    };
    const handleRemoveProduct = (productId) => {
      store.dispatch("removeProduct", productId);
    };
    return {
      handleRemoveProduct,
      addedProducts,
      selectedProduct,
      handleAddProduct,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-button {
  margin-bottom: 1%;
  cursor: pointer;
}

.detail {
  height: 100vh;
  overflow: auto;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/image/detailFone 1.png");
  z-index: 100;
}
</style>
