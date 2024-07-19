<template>
  <div :class="['card', cardClass]">
    <img :class="['card__image', imageClass]" :src="item.img" alt="" />
    <h2 :class="['card__title', titleClass]">
      {{ item.title }}
    </h2>
    <p :class="['card__text', textClass]" :style="textStyle">
      {{ item.text }}
    </p>
    <div :class="['container', wrapperClass]" :style="wrapperStyle">
      <div
        :class="['container__spacer', spacerClass]"
        :style="spacerStyle"
      ></div>
      <p :class="['container__price', priceClass]" :style="priceStyle">
        {{ item.price }} ₽
        <slot
          name="button"
          :class="['container__button', buttonClass]"
          :style="buttonStyle"
        ></slot>
      </p>
    </div>
  </div>
</template>

<script>
import { useStore, Product } from "vuex";
import { computed } from "vue";

export default {
  name: "CardProduct",
  components: {
    // TheButton,
    // deleteicon,
  },
  props: {
    item: {
      type: Product,
      default: null,
    },
    // imageUrl: {
    //   type: String,
    //   required: true,
    // },
    // title: {
    //   type: String,
    //   default: "",
    // },
    // text: {
    //   type: String,
    //   default: "",
    // },
    // price: {
    //   type: String,
    //   default: "",
    // },
    cardClass: {
      type: String,
      default: "",
    },
    cardStyle: {
      type: Object,
      default: () => ({}),
    },
    imageClass: {
      type: String,
      default: "",
    },
    imageStyle: {
      type: Object,
      default: () => ({}),
    },
    titleClass: {
      type: String,
      default: "",
    },
    titleStyle: {
      type: Object,
      default: () => ({}),
    },
    textClass: {
      type: String,
      default: "",
    },
    textStyle: {
      type: Object,
      default: () => ({}),
    },
    wrapperClass: {
      type: String,
      default: "",
    },
    wrapperStyle: {
      type: Object,
      default: () => ({}),
    },
    spacerClass: {
      type: String,
      default: "",
    },
    spacerStyle: {
      type: Object,
      default: () => ({}),
    },
    priceClass: {
      type: String,
      default: "",
    },
    priceStyle: {
      type: Object,
      default: () => ({}),
    },
    buttonClass: {
      type: String,
      default: "",
    },
    buttonStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const store = useStore();
    const count = computed(() => {
      return store.getters.getCount;
    });

    return {
      count,
      store,
    };
  },
  computed: {
    // currentButton() {
    //   return this.$route.name === "home" ? "TheButton" : "deleteicon";
    // },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  flex-grow: 1;
}

.card {
  font-size: 10px;
  border: 1px solid orange;
  width: 23%;
  height: 552px;
  color: white;
  text-align: left;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-family: "Montserrat";
  &__image {
    margin: 0 auto;
    max-width: 90%;
    max-height: 270px;
    padding-top: 35px;
  }

  &__title {
    padding-left: 17px;
    padding-right: 27px;
    font-size: 1.7em;
    font-weight: 500;
    line-height: 20px;
    flex-wrap: wrap;
    word-wrap: break-word;
  }
  &__text {
    font-size: 14px;
    padding-left: 21px;
    padding-right: 30px;
    display: block;
  }
  .container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .spacer {
      flex-grow: 1;
    }
    &__price {
      display: flex;
      justify-content: space-between;
      text-align: center;
      align-items: center;
      font-size: 1.7em;
      padding: 30px 21px 36px 21px;
    }
    // &__button {
    //   padding-right: 21px;
    // }
  }
}

.card__basket {
  border: none;
  padding-top: 40px;
  font-size: 10px;
  width: 100%;
  height: auto;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: "Montserrat";

  &-title {
    max-width: 310px;
    max-height: 42px;
    margin-left: 1px;
    font-size: 2em;
    font-weight: 500;
    line-height: 20px;
    flex-wrap: wrap;

    // align-items: center;
    margin-top: 20px; /* Добавлено для отступа сверху */
  }
  &-text {
    display: none;
  }
  &-image {
    margin: 0;
    max-width: 120px;
    align-items: center;
    max-height: 120px;
    margin-left: 220px;
    margin-bottom: 20px;
    margin-right: 98px;
  }
  &-price {
    color: orange;
    gap: 15px;
    align-self: flex-end;
    margin-right: 181px;
  }
  .container {
    padding-left: 100px;
    padding-top: 20px;
    width: 25%;
  }
}
</style>
