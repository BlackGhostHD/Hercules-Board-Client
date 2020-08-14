import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import i18n from "./i18n";

import "@/helpers/firebase";
import setup from "@/helpers/axios";
Vue.prototype.$axios = setup();

import DefaultLayout from "./layouts/Default";
import NoSidebarLayout from "./layouts/NoSidebar";

Vue.component("defaultLayout", DefaultLayout);
Vue.component("noSidebarLayout", NoSidebarLayout);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	i18n,
	render: (h) => h(App),
}).$mount("#app");
