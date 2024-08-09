<script setup>
import { appRoutes } from "@/router/routes";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { computed, reactive, ref } from "vue";
import CommonButton from "@/components/ui/CommonButton.vue";

const store = useStore();
const router = useRouter();

const formData = reactive({
  email: "",
  password: "",
  isAgreedToUpdates: store.getters.isAgreed,
});

const customErrorMessage = ref("");

const minLengthWithMessage = (min) =>
  helpers.withMessage(
    `Поле должно содержать минимум ${min} символов.`,
    minLength(min)
  );

const rules = computed(() => ({
  email: {
    required: helpers.withMessage("Поле не должно быть пустым", required),
    email: helpers.withMessage("Некорректный email адрес", email),
    minLength: minLengthWithMessage(3),
  },
  password: {
    required: helpers.withMessage("Поле не должно быть пустым", required),
    minLength: minLengthWithMessage(3),
  },
}));

const v$ = useVuelidate(rules, formData);

const login = async () => {
  const { email, password } = formData;
  await store.dispatch("login", { email, password });
  await store.dispatch("updateUserAgreement", formData.isAgreedToUpdates);

  if (store.getters.isAuthenticated) {
    router.push(appRoutes.MainPageRoute.path);
  } else {
    customErrorMessage.value = "Логин или пароль неверен";
  }
};

const submitForm = async () => {
  customErrorMessage.value = "";
  const result = await v$.value.$validate();
  if (!result) {
    customErrorMessage.value = "Логин или пароль неверен";
  } else {
    await login();
  }
};
</script>

<template>
  <div class="wrapper">
    <form class="login" @submit.prevent="submitForm">
      <router-link
        :to="appRoutes.RegistrationPageRoute.path"
        class="login__link"
      >
        Зарегистрироваться
      </router-link>
      <h1 class="login__title">ВХОД</h1>
      <input
        class="login__email"
        v-model="formData.email"
        type="text"
        placeholder="Логин"
        required
      />
      <div class="field-error-container">
        <span
          v-for="error in v$.email.$errors"
          :key="error.$uid"
          class="field-error"
        >
          {{ error.$message }}
        </span>
      </div>
      <input
        class="login__password"
        v-model="formData.password"
        type="password"
        placeholder="Пароль"
        required
      />
      <div class="field-error-container">
        <span
          v-for="error in v$.password.$errors"
          :key="error.$uid"
          class="field-error"
        >
          {{ error.$message }}
        </span>
      </div>
      <div class="login__container">
        <input
          class="login__container-checkbox"
          type="checkbox"
          id="loginUpdates"
          v-model="formData.isAgreedToUpdates"
        />
        <label class="login__container-label" for="loginUpdates">
          Я согласен получать обновления на почту
        </label>
      </div>
      <span class="field-error">
        {{ customErrorMessage }}
      </span>
      <common-button text="Войти"></common-button>
    </form>
  </div>
</template>

<style lang="scss">
/* Ваши стили */
</style>

<style lang="scss">
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

.login {
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
    font-family: "Montserrat", serif;
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

  &__submit {
    margin-bottom: 5%;
    font-family: "Montserrat";
    font-size: 14px;
    font-weight: 400;
    width: 200px;
    height: 42px;
    border: none;
    background-color: #d58c51;
  }
}
</style>
