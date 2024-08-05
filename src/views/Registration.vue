<template>
  <div class="wrapperAutorization">
    <app-registration></app-registration>
  </div>
</template>

<script>
import AppRegistration from "@/components/block/AppRegistration.vue";
export default {
  name: "appAuthorization",
  components: { AppRegistration },
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
