<script setup>
import router from "@/router";
import { appRoutes } from "@/router/routes";
import { useVuelidate } from "@vuelidate/core";
import { minLength, helpers } from "@vuelidate/validators";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import CommonButton from "@/components/ui/CommonButton.vue";

const store = useStore();

const formData = reactive({
  registrationEmail: "",
  registrationPassword: "",
});
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const customErrorMessage = ref("");
const regexEmail = (value) => {
  return emailRegex.test(value);
};
const emailValidator = helpers.withMessage(
  "Некорректный адрес электронной почты",
  (value) => regexEmail(value)
);
const minLengthWithMessage = (min) =>
  helpers.withMessage(
    `Поле должно содержать не менее ${min} символов.`,
    minLength(min)
  );

const rules = computed(() => ({
  registrationEmail: {
    minLength: minLengthWithMessage(4),
    emailValidator,
  },
  registrationPassword: { minLength: minLengthWithMessage(4) },
}));

const v$ = useVuelidate(rules, formData);

const register = () => {
  const user = {
    email: formData.registrationEmail,
    password: formData.registrationPassword,
  };
  store.dispatch("register", user);
  if (!store.getters.isRegistartion) {
    router.push(appRoutes.LoginPageRoute.path);
  }
};

const submitForm = async () => {
  customErrorMessage.value = "";
  const result = await v$.value.$validate();
  if (!result) {
    console.log("error");
  } else {
    register();
  }
};
</script>

<template>
  <div class="wrapper">
    <form class="registration" @submit.prevent="submitForm">
      <router-link
        :to="appRoutes.LoginPageRoute.path"
        class="registration__link"
      >
        Авторизоваться
      </router-link>
      <h1 class="registration__title">РЕГИСТРАЦИЯ</h1>
      <input
        class="registration__email"
        v-model="formData.registrationEmail"
        type="text"
        placeholder="Логин"
        required
      />
      <div class="field-error-container">
        <span
          v-for="error in v$.registrationEmail.$errors"
          :key="error.$uid"
          class="field-error"
        >
          {{ error.$message }}
        </span>
      </div>
      <input
        class="registration__password"
        v-model="formData.registrationPassword"
        type="password"
        placeholder="Пароль"
        required
      />
      <div class="field-error-container">
        <span
          v-for="error in v$.registrationPassword.$errors"
          :key="error.$uid"
          class="field-error"
        >
          {{ error.$message }}
        </span>
      </div>
      <div class="registration__container">
        <input
          class="registration__container-checkbox"
          type="checkbox"
          id="loginUpdates"
        />
        <label class="registration__container-label" for="loginUpdates">
          Я согласен получать обновления на почту
        </label>
      </div>
      <span class="field-error">
        {{ customErrorMessage }}
      </span>
      <common-button text="Зарегистрироваться" />
    </form>
  </div>
</template>

<script>
export default {
  name: "app-registration",
  components: {},
  props: {},
  setup() {},
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 500px;
  height: 100vh;
  margin: 0 auto;
  align-content: center;
}

.field-error-container {
  height: 8px;
  width: 100%;
  align-items: center;
  margin-bottom: 4px;
}

.field-error {
  padding-bottom: 1px;
  font-size: 8px;
  color: red;
  height: 16px;
  margin-left: 10%;
}

.registration {
  font-family: "Montserrat";
  background-color: white;
  width: 500px;
  height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__link {
    margin-top: 1%;
    font-size: 11px;
    font-weight: 300;
    line-height: 13.41px;
    color: #d58c51;
    margin-left: 70%;
  }

  &__title {
    margin-top: 3%;
    font-size: 31px;
    font-weight: 700;
    line-height: 37.79px;
  }

  &__email {
    position: relative;
    margin-top: 6%;
    padding-left: 15px;
    border-radius: 61px;
    border: 1px solid #d58c51;
    width: 420px;
    height: 39px;
    font-family: "Montserrat";
    font-size: 16px;
    font-weight: 400;
    line-height: 19.5px;
    text-align: left;
    color: rgba(22, 21, 22, 1);
  }

  &__password {
    position: relative;
    margin-top: 1.5%;
    font-family: "Montserrat";
    font-size: 16px;
    font-weight: 400;
    line-height: 19.5px;
    text-align: left;
    padding-left: 15px;
    border-radius: 61px;
    border: 1px solid rgba(213, 140, 81, 1);
    width: 420px;
    height: 39px;
    color: rgba(22, 21, 22, 1);
  }

  &__container {
    display: flex;
    align-items: center;
    margin-right: 33%;
    margin-top: 2%;

    &-label {
      font-family: "Montserrat";
      font-size: 11px;
      font-weight: 300;
      line-height: 13.41px;
      text-align: left;
    }

    &-checkbox {
      appearance: none;
      width: 20px;
      height: 20px;
      border: 1px solid #d58c51;
      border-radius: 50%; /* Закругленные углы */
      position: relative;
      cursor: pointer;
      outline: none;
      margin-right: 10px;
      background-color: white;
      transition: background-color 0.3s, border-color 0.3s;

      &:checked {
        background-color: #d58c51;
        border-color: #d58c51;

        &::after {
          content: "";
          position: absolute;
          top: 1px;
          left: 4px;
          width: 6px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
      }

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: orange; /* Цвет для неактивного чекбокса */
        z-index: -1;
      }
    }
  }
}
</style>
