<template>
  <div class="basket">
    <Header
      header__basket="header__basket"
      title="КОРЗИНА С ВЫБРАННЫМИ ТОВАРАМИ"
      textClass="header__basket-text"
      subtextClass="header__basket-subtext"
    >
      <template v-slot:basket__icon
        ><arrowicon-vue class="arrow-icon"></arrowicon-vue
      ></template>
    </Header>
    <div class="main">
      <div class="container main__wrapper">
        <CardProduct
          v-for="product in basketProducts"
          :key="product.id"
          :item="product"
          cardClass="card__basket"
          titleClass="card__basket-title"
          textClass="card__basket-text"
          priceClass="card__basket-price"
          wrapperClass="container2"
          imageClass="card__basket-image"
          ><template v-slot:button>
            <deleteicon @click="handleRemoveProduct(product.id)"></deleteicon>
          </template>
        </CardProduct>
        <div class="spacer__footer"></div>
        <footer-vue title="Заказ на сумму:" price="2 700"></footer-vue>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
import Header from "@/components/block/Header.vue";
import CardProduct from "@/components/elements/CardProduct.vue";
import arrowiconVue from "@/components/icon/arrowicon.vue";
import footerVue from "@/components/elements/footer.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import Deleteicon from "@/components/icon/deleteicon.vue";
// import { mapGetters } from "vuex";
export default {
  name: "basketPage",
  components: {
    Header,
    arrowiconVue,
    CardProduct,
    footerVue,
    Deleteicon,
  },
  setup() {
    const store = useStore();
    const basketProducts = computed(() => {
      return store.getters.getBasketProducts;
    });
    const handleRemoveProduct = (productId) => {
      console.log("removeProduct", productId);
      store.dispatch("removeProduct", productId);
    };
    return {
      basketProducts,
      handleRemoveProduct,
    };
  },
};
</script>

<style lang="scss" scoped>
.basket {
  height: 100vh;
  overflow: auto;
  background-color: #161516;
}
.arrow-icon {
  justify-content: center;
}
</style>
