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
  mounted() {
    AOS.init({
      duration: 600,
      once: true,
      offset: 300,
      anchorPlacement: "bottom-center"
    });
    window.addEventListener("load", AOS.refresh);
  },
  render: (h) => h(App)
}).$mount("#app");
