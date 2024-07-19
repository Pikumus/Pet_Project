<template>
  <footer class="footer">
    <h1 class="footer__title">
      {{ title }}
    </h1>
    <p class="footer__price">{{ totalPrice }} ₽</p>
    <buttonAddQuestVue />
  </footer>
</template>

<script>
import buttonAddQuestVue from "../ui/buttonAddQuest.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "footer-basket",
  components: {
    buttonAddQuestVue,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      default: "",
    },
  },
  setup() {
    const store = useStore();
    const basketProducts = computed(() => {
      return store.getters.getBasketProducts;
    });
    const totalPrice = computed(() => {
      return basketProducts.value.reduce(
        (total, product) => total + parseFloat(product.price),
        0
      );
    });
    return {
      totalPrice,
      basketProducts,
    };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  z-index: 2;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  //   gap: 16px;
  align-items: center;
  border-top: 1px solid orange;
  background-color: #161516;
  width: 100%;
  height: 90px;
  color: white;
  font-family: "Montserrat";
  font-size: 21px;
  font-weight: 400;
  line-height: 25.6px;
  text-align: left;

  &__title {
    text-transform: uppercase;
    padding-right: 18px;
  }
  &__price {
    padding-right: 260px;
    display: inline-block;
    color: orange;
    font-size: 18px;
  }
}
</style>
