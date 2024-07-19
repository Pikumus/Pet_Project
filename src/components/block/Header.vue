<template>
  <header :class="classNameBasket">
    <div :class="['container header__wrapper', header__basket]">
      <slot name="basket__icon"></slot>
      <h1 class="header__title">{{ title }}</h1>
      <div class="header__text-container">
        <div class="header__text-content">
          <p :class="['header__text', textClass]">
            {{ basketProducts.length }} {{ text }}
          </p>
          <span :class="['header__text-subtext', subtextClass]">{{
            totalPrice
          }}</span>
        </div>
        <slot name="icon"></slot>
      </div>
    </div>
  </header>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
// import basketProducts from "@/store/modules/basketProducts";
export default {
  name: "TheHeader",
  props: {
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      default: "",
    },
    classNameBasket: {
      type: String,
      default: "",
    },
    titleClass: {
      type: String,
      default: "",
    },
    textClass: {
      type: String,
      default: "",
    },
    subtextClass: {
      type: String,
      default: "",
    },
    header__basket: {
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
.header {
  &__wrapper {
    margin: 0 auto;
    font-family: "Montserrat";
    padding-top: 4%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
  }
  // .basket__icon {
  //   margin-left: 100px;
  // }
  &__title {
    display: inline;
    font-size: 31px;
    font-weight: 700;
    line-height: 37.79px;
    text-align: left;
  }
  &__text-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  &__text-content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  &__text {
    line-height: 20px;
    font-weight: 500;
    font-size: 17px;
    margin: 0;
  }
  &__text-subtext {
    line-height: 20px;
    font-weight: 500;
    font-size: 17px;
  }
}
.header__basket {
  gap: 60px;
  justify-content: center;
  .header__basket-text {
    display: none;
  }
  .header__basket-subtext {
    display: none;
  }
}
</style>
