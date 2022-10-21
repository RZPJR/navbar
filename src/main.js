import "./set-public-path";
import Vue from "vue";
import singleSpaVue from "single-spa-vue";

import App from "@/App.vue";
import router from "./router";
import store from './store';
import http from './plugins/axios';
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(http);

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App);
    },
    vuetify,
    router,
    store,
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
