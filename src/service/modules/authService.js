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
};
