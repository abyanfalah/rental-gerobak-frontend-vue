import api from "../apiService";
const url = api.defaults.baseURL + "rent/";
export default {
  getAll: () => {
    // TODO: add pagination params
    return api.get(url, {
      params: {
        with_detail: true,
        get_view: true,
      },
    });
  },
  getOngoing: () => {
    return api.get(url, {
      params: {
        status: "berlangsung",
        with_detail: true,
      },
    });
  },
  getToday: () => {
    return api.get(url + "today", {
      params: {
        with_detail: true,
      },
    });
  },
  getById: (id) => {
    return api.get(url + id, {
      params: {
        get_view: true,
      },
    });
  },
  create: (newData) => {
    return api.post(url, newData);
  },

  getBadgeColorByStatus: (rentStatus) => {
    const colors = {
      ok: "success",
      berlangsung: "primary",
      partial: "warning",
    };

    return colors[rentStatus.toLowerCase()];
  },
  // update: (newData) => {
  //   return api.put(url, newData);
  // },
  // delete: (id) => {
  //   return api.put(url + id);
  // },
};
