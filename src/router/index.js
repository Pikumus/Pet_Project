import { createRouter, createWebHashHistory } from "vue-router";
import { appRoutes } from "@/router/routes";
const routes = [appRoutes.basketPageRoute, appRoutes.mainPageRoute];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
