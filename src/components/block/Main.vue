<template>
  <div class="main">
    <div :class="['container', 'main__wrapper', wrapperClass]">
      <card-product v-for="(item, index) in products" :key="index" :item="item">
        <template v-slot:button>
          <the-button @click="() => handleAddProduct(item)"></the-button>
        </template>
      </card-product>
      <card-product v-for="(item, index) in products" :key="index" :item="item">
        <template v-slot:button>
          <the-button
            @click="() => handleAddProduct(item)"
          ></the-button> </template
      ></card-product>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
import CardProduct from "../elements/CardProduct.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import TheButton from "../ui/buttonbasket.vue";

export default {
  name: "block-main",
  components: {
    TheButton,
    CardProduct,
  },
  props: {},
  setup() {
    const store = useStore();

    const products = computed(() => {
      return store.getters.getProducts;
    });
    const handleAddProduct = (item) => {
      console.log(item);
      store.dispatch("addProduct", item);
    };
    return {
      products,
      handleAddProduct,
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  &__wrapper {
    padding-top: 5.5%;
    margin: 0 auto;
    height: 552px;
    display: flex;
    gap: 1em;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: row;
  }
}
</style>
