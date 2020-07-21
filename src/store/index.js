import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import setup from "@/helpers/axios";

// plugins
import firebase from "./plugins/firebase";
import createPersistedState from "vuex-persistedstate";

// modules
import user from "./user";
import github from "./github";

Vuex.Store.prototype.$axios = setup();

const store = new Vuex.Store({
  plugins: [createPersistedState({ paths: ["user"] }), firebase],
  modules: {
    user,
    github
  }
});

export default store;
