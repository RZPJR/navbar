import "./set-public-path";
import Vue from "vue";
import singleSpaVue from "single-spa-vue";

import App from "@/App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify"

Vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App);
    },
    vuetify,
    router,
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
