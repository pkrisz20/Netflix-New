import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Axios from "axios";
import VueAxios from "vue-axios";
import { store } from "./store/store";
import AOS from "aos";
import "aos/dist/aos.css";

Vue.config.productionTip = false;
Vue.use(VueAxios, Axios);

new Vue({
  router,
  store,
  render: (h) => h(App),
  mounted() {
    AOS.init({
      once: true,
      duration: 600,
      offset: 150,
      anchorPlacement: 'center-bottom'
    });
  }
}).$mount("#app");
