import { useAuthStore } from "../../stores/auth";
import api from "../apiService";
import router from "../../router";
const url = api.defaults.baseURL + "auth/";

export default {
  login: (username, password) => {
    console.log();
    return api.post(url + "login", {
      username,
      password,
    });
  },
  logout: () => {
    return api.post(url + "logout");
  },
  checkAuth: async () => {
    const authStore = useAuthStore();
    const isAuthenticated = (await api.get(url + "isLogin")).data;
    if (!isAuthenticated) router.push("/login");
    authStore.isAuthenticated = isAuthenticated;
    return isAuthenticated;
  },
};
