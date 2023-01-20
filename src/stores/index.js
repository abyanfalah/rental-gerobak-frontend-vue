import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useIndexStore = defineStore("index", () => {
  const error = ref();
  const justLoggedIn = ref(false);
  const choosenUser = ref({});
  const choosenCustomer = ref({});
  const choosenGerobak = ref({});

  return {
    error,
    justLoggedIn,
    choosenUser,
    choosenCustomer,
    choosenGerobak,
  };
});
