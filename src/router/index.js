import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "../store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters["user/isAuthenticated"];
  const requiresAuth = to.matched.some(record => !record.meta.requiresNoAuth);
  if (!isAuthenticated && requiresAuth) {
    next("login");
  } else {
    next();
  }
});

export default router;
