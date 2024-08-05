<script setup>
// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  text: { type: String, required: true },
});
</script>

<template>
  <button class="common-button" type="submit">{{ text }}</button>
</template>

<style lang="scss">
.common-button {
  margin-bottom: 5%;
  font-family: "Montserrat", serif;
  font-size: 14px;
  font-weight: 400;
  width: 200px;
  height: 42px;
  border: none;
  background-color: #d58c51;
}
</style>
