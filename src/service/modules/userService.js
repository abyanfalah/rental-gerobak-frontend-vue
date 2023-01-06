import api from "../apiService";
api.defaults.baseURL += "user/";

export default {
  getAll: () => {
    return api.get();
  },
  getById: (id) => {
    return api.get(`${id}`);
  },
  create: (newUser) => {
    return api.post();
  },
  update: (newData) => {
    return api.put();
  },
  delete: (id) => {
    return api.put(`${id}`);
  },
};
