import api from "../apiService";
const url = api.defaults.baseURL + "user/";

export default {
  getAll: () => {
    // TODO: add pagination params
    return api.get(url, {
      params: {
        all: true,
      },
    });
  },
  getById: (id) => {
    return api.get(url + id);
  },
  create: (formData) => {
    return api.post(url, formData);
  },
  update: (newData, id) => {
    return api.put(url + id, newData);
  },
  delete: (id) => {
    return api.delete(url + id);
  },
  userImageUrl: (id) => `${url}${id}/image`,
  getColorByAccess: (access) => {
    const colors = {
      admin: "danger",
      user: "primary",
    };
    return colors[access.toLowerCase()];
  },
  checkUsername: (usernameToCheck) => {
    return api.get(url + "check_username", {
      params: {
        username: usernameToCheck,
      },
    });
  },
  getSession: () => api.get("/session"),
};
