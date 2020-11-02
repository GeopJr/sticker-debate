import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default-dark.css";
import Axios from "axios";

Vue.prototype.$http = Axios;

Vue.config.productionTip = false;

Vue.use(VueMaterial);

import { domain, clientId } from "@/auth_config.json";

import { Auth0Plugin } from "./auth";

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
