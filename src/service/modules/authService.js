import { useAuthStore } from "../../stores/auth";
import api from "../apiService";
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
    const response = (await api.get(url + "isLogin")).data;
    authStore.isAuthenticated = response;
    return response;
  },
};
