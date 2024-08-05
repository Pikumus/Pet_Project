<template>
  <div class="wrapperAutorization">
    <app-login></app-login>
  </div>
</template>

<script>
import AppLogin from "@/components/block/AppLogin.vue";
export default {
  name: "appAuthorization",
  components: { AppLogin },
  props: {},
  setup() {},
};
</script>

<style lang="scss" scoped>
.wrapperAutorization {
  background: #00000073;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("~@/assets/image/fone.png");
  background-size: cover;
  background-position: center;
  height: 100vh;
}
</style>
