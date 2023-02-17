import "./set-public-path";
import Vue from "vue";
import singleSpaVue from "single-spa-vue";

import App from "@/App.vue";
import router from "./router";
import store from './store';
import http from './services/http'
import vuetify from "./plugins/vuetify";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.config.productionTip = false;
Vue.use(VueToast);

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    created: () => http.init(),
    render: h => h(App),
    vuetify,
    router,
    store,
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
