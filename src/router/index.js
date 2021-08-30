import Vue from "vue";
import VueRouter from "vue-router";
import LoginRouter from "./login.router";
import HomeRouter from "./home.router";
import { isAuthenticated, getAuthSession } from "../helpers/auth.helper";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/documents",
    },
    LoginRouter,
    HomeRouter,
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.auth) {
    if (await isAuthenticated()) {
      next();
    } else next({ name: "login" });
    const auth = getAuthSession();
    if (to.meta.role.length && !to.meta.role.includes(auth.role)) {
      next({ path: "/" });
    }
  } else next();
});
export default router;
