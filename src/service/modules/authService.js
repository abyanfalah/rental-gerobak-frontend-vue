import api from "../apiService";
api.defaults.baseURL += "auth/";

export default {
  login: (username, password) => {
    return api.post(`login`, {
      username,
      password,
    });
  },
  logout: () => {
    return api.post(`logout`);
  },
};
