import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import i18n from "./i18n";

import "@/helpers/firebase";

import DefaultLayout from "./layouts/Default";
import NoSidebarLayout from "./layouts/NoSidebar";
import Skeleton from "vue-loading-skeleton";
Vue.use(Skeleton);

Vue.component("defaultLayout", DefaultLayout);
Vue.component("noSidebarLayout", NoSidebarLayout);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
