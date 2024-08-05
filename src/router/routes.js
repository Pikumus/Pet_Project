import MainPage from "@/views/MainPage.vue";
import BasketPage from "@/views/BasketPage.vue";
import Login from "@/views/Login.vue";
import Registration from "@/views/Registration.vue";
import store from "@/store";
import DetailBasketPage from "@/views/DetailBasketPage.vue";
export const appRoutes = {
  mainPageRoute: {
    path: "/main",
    name: "Main",
    component: MainPage,
    meta: { requiresAuth: true },
  },
  basketPageRoute: {
    path: "/basket",
    name: "Basket",
    component: BasketPage,
    meta: { requiresAuth: true },
  },
  LoginPageRoute: {
    path: "/",
    name: "Authorization",
    component: Login,
    beforeEnter: (to, from, next) => {
      store.dispatch("resetState"); // Сброс состояния при переходе на страницу логина
      next();
    },
  },
  detailPageRoute: {
    path: "/product/:id",
    name: "productDetail",
    component: DetailBasketPage,
    meta: { requiresAuth: true },
  },
  RegistrationPageRoute: {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
};
