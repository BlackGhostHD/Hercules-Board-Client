import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import firebase from "./plugins/firebase";
import createPersistedState from "vuex-persistedstate";

import user from "./user";

export default new Vuex.Store({
  plugins: [createPersistedState({ paths: ["user"] }), firebase],
  modules: {
    user
  }
});
