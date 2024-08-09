<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
setTimeout(() => {
  router.go(-1);
}, "500");
</script>

<template>
  <div class="completed-page">
    <h1 class="completed-page__text">Ваш заказ оформлен</h1>
  </div>
</template>

<style scoped lang="scss">
.completed-page {
  text-align: center;
  font-size: 50px;
  color: #d58c51;
  height: 100vh;
  background: #161516;

  &__text {
    padding-top: 20%;
  }
}
</style>
