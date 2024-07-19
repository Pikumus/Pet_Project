import MainPage from "@/views/MainPage.vue";
import BasketPage from "@/views/BasketPage.vue";
export const appRoutes = {
  mainPageRoute: {
    path: "/",
    name: "home",
    component: MainPage,
  },
  basketPageRoute: {
    path: "/basket",
    name: "basket",
    component: BasketPage,
  },
};
