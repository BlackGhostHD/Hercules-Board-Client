import Vue from "vue";

const eventBus = {};
const vue = new Vue();

// adds '$eventBus' to all components
eventBus.install = function(Vue) {
	Vue.prototype.$eventBus = vue;
};
Vue.use(eventBus);
