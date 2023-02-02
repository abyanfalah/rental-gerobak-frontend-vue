import api from "../apiService";
const url = api.defaults.baseURL + "gerobak/";
export default {
  getAll: () => {
    // TODO: add pagination params
    return api.get(url, {
      params: {
        get_view: true,
      },
    });
  },
  getById: (id) => {
    return api.get(url + id);
  },
  create: (newData) => {
    return api.post(url, newData);
  },
  update: (newData, id) => {
    return api.put(url + id, newData);
  },
  delete: (id) => {
    return api.delete(url + id);
  },
};
