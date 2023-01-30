import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const useIndexStore = defineStore("index", () => {
  const error = ref();
  const justLoggedIn = ref(false);

  const choosenUser = ref({});
  const choosenCustomer = ref({});
  const choosenGerobak = ref({});
  const choosenRent = ref({});

  const actionSuccessMessage = ref(null);

  return {
    error,
    justLoggedIn,
    choosenUser,
    choosenCustomer,
    choosenGerobak,
    choosenRent,
    actionSuccessMessage,
  };
});
