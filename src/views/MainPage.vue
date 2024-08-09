<template>
  <div class="home">
    <the-header
      title="НАША ПРОДУКЦИЯ"
      text="товара"
      subtext="на сумму"
      price="3 500 ₽"
      :classNameBasket="header"
      ><template v-slot:icon> <basketicon></basketicon> </template>
    </the-header>
    <Main> </Main>
  </div>
</template>

<script>
// @ is an alias to /src
import basketicon from "@/components/icon/BasketIcon.vue";
import TheHeader from "../components/block/Header.vue";
import Main from "@/components/block/Main.vue";
import { useStore } from "vuex";
import { computed } from "vue";
// import buttonbasket from "@/components/ui/buttonbasket.vue";
export default {
  name: "HomeView",
  components: {
    TheHeader,
    Main,
    basketicon,
    // buttonbasket,
  },
  props: {},
  setup() {
    const store = useStore();
    const count = computed(() => {
      return store.getters.getCount;
    });
    return {
      count,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  overflow: auto;
  background-color: #161516;
}
</style>
