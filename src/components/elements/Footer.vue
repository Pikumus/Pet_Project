<template>
  <footer class="footer">
    <h1 class="footer__title">{{ title }}</h1>
    <p class="footer__price">{{ totalPrice }} ₽</p>
    <buttonCompleted @click="navigateToCompletedPage" />
  </footer>
</template>

<script>
import buttonCompleted from "../ui/ButtonCompleted.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { appRoutes } from "@/router/routes";

export default {
  name: "FooterBasket",
  components: {
    buttonCompleted,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  setup() {
    const router = useRouter(); // Получаем экземпляр маршрутизатора

    const store = useStore();
    const basketProducts = computed(() => store.getters.getBasketProducts);
    const totalPrice = computed(() =>
      basketProducts.value.reduce(
        (total, product) => total + parseFloat(product.price) || 0,
        0
      )
    );

    function navigateToCompletedPage() {
      if (basketProducts.value.length > 0) {
        router.push(appRoutes.CompletedPageRoute.path);
      }
    }

    return {
      navigateToCompletedPage, // Возвращаем функцию для использования в шаблоне
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
