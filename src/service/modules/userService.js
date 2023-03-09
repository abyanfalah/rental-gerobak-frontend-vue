import api from "../apiService";
const url = api.defaults.baseURL + "user/";

export default {
  getAll: () => {
    // TODO: add pagination params
    return api.get(url);
  },
  getById: (id) => {
    return api.get(url + id);
  },
  // create: (newData) => {
  //   return api.post(url, newData);
  // },
  create: (formData) => {
    return api.post(url, formData);
  },
  update: (newData, id) => {
    return api.put(url + id, newData);
  },
  delete: (id) => {
    return api.delete(url + id);
  },
  userImageUrl: (id) => `${url}/${id}/image`,
};
