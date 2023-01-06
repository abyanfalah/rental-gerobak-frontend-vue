import api from "../apiService";
api.defaults.baseURL += "gerobak";
export default {
  getAll: () => {
    // TODO: add pagination params
    return api.get();
  },
  getById: (id) => {
    return api.get(`/${id}`);
  },
  create: (newUser) => {
    return api.post();
  },
  update: (newData) => {
    return api.put(``);
  },
  delete: (id) => {
    return api.put(`/${id}`);
  },
};
