import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader
// import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from "vue";
import Vuetify from "vuetify/lib";
// import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: "md",
  },
};

export default new Vuetify(opts);
