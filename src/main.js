import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import "./assets/bootstrap.bundle";
import "./assets/bootstrap.css";
import "./assets/icons/bootstrap-icons.css";

axios.defaults.withCredentials = true;
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.use(pinia);

app.mount("#app");
