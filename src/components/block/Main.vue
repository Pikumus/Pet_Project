<template>
  <div class="main">
    <div :class="['container', 'main__wrapper', wrapperClass]">
      <card-product
        v-for="item in products"
        :key="item.id"
        :item="item"
        @click="() => handleAddSelectProduct(item)"
        cardClass="card"
        imageClass="card__image"
        titleClass="card__title"
        textClass="card__text"
        wrapperClass="container"
        spacerClass="container__spacer"
        priceClass="container__price"
        buttonClass="container__button"
      >
        <template v-slot:button>
          <the-button
            v-if="!addedProducts[item.id]"
            @click.stop="() => handleAddProduct(item)"
          ></the-button>
          <deleteicon v-else @click.stop="handleRemoveProduct(item.id)" />
        </template>
      </card-product>
    </div>
  </div>
</template>

<script>
import CardProduct from "../elements/CardProduct.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import TheButton from "../ui/buttonbasket.vue";
import { appRoutes } from "@/router/routes";
import { useRouter } from "vue-router";
import deleteicon from "../icon/deleteicon.vue";

export default {
  name: "block-main",
  components: {
    TheButton,
    CardProduct,
    deleteicon,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const products = computed(() => store.getters.getProducts);
    const addedProducts = computed(() => store.getters.getAddedProducts);

    const handleAddProduct = (item) => {
      store.dispatch("addProduct", item);
    };

    const handleRemoveProduct = (productId) => {
      store.dispatch("removeProduct", productId);
    };

    const handleAddSelectProduct = (item) => {
      store.dispatch("setSelectedProduct", item);
      router.push(`${appRoutes.detailPageRoute.path.replace(":id", item.id)}`);
    };

    return {
      products,
      handleAddProduct,
      handleRemoveProduct,
      handleAddSelectProduct,
      appRoutes,
      router,
      addedProducts,
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  &__wrapper {
    padding-bottom: 5%;
    padding-top: 5.5%;
    margin: 0 auto;
    height: 100%;
    display: flex;
    gap: 1em;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: row;
  }
}
</style>
