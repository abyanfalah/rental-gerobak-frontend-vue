import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import authService from "./service/modules/authService";

import "./assets/bootstrap.bundle";
import "./assets/bootstrap.css";
import "./assets/icons/bootstrap-icons.css";
import { useAuthStore } from "./stores/auth";
import { useRouter } from "vue-router";

axios.defaults.withCredentials = true;
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.use(pinia);

try {
  await authService.checkAuth();
} catch (err) {
  console.error(err);
  useAuthStore().isAuthenticated = false;
  alert(`${err.message}: you may forgot to run the backend`);
}

app.mount("#app");
